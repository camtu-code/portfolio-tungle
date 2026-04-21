'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from '../Admin.module.css';

const CONTAINER_SIZE = 480; // display square px
const OUTPUT_SIZE = 600;    // saved file px

// ─── How the image renders inside objectFit:contain container ─────────────────
function getContainRect(natW: number, natH: number, containerSz: number) {
  const scale = Math.min(containerSz / natW, containerSz / natH);
  const renderedW = natW * scale;
  const renderedH = natH * scale;
  const offsetX = (containerSz - renderedW) / 2;
  const offsetY = (containerSz - renderedH) / 2;
  return { offsetX, offsetY, renderedW, renderedH, scale };
}

// ─── Crop image using exact natural coordinates ────────────────────────────────
function cropToBlob(
  img: HTMLImageElement,
  naturalX: number,
  naturalY: number,
  naturalSz: number,
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, naturalX, naturalY, naturalSz, naturalSz, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      b => b ? resolve(b) : reject(new Error('toBlob failed')),
      'image/jpeg', 0.93,
    )
  );
}

// ─── Draggable crop circle ─────────────────────────────────────────────────────
interface Pos { x: number; y: number }
interface CropState { x: number; y: number; size: number }

function CropOverlay({
  imageSrc,
  crop,
  containerRect,  // { offsetX, offsetY, renderedW, renderedH } inside CONTAINER_SIZE px
  onChange,
}: {
  imageSrc: string;
  crop: CropState;
  containerRect: { offsetX: number; offsetY: number; renderedW: number; renderedH: number };
  onChange: (c: CropState) => void;
}) {
  const dragging = useRef(false);
  const startMouse = useRef<Pos>({ x: 0, y: 0 });
  const startCrop = useRef<Pos>({ x: 0, y: 0 });
  const { offsetX, offsetY, renderedW, renderedH } = containerRect;

  const clamp = (c: CropState): CropState => ({
    ...c,
    x: Math.max(offsetX, Math.min(c.x, offsetX + renderedW - c.size)),
    y: Math.max(offsetY, Math.min(c.y, offsetY + renderedH - c.size)),
  });

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    startMouse.current = { x: clientX, y: clientY };
    startCrop.current = { x: crop.x, y: crop.y };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
      const dx = clientX - startMouse.current.x;
      const dy = clientY - startMouse.current.y;
      onChange(clamp({ ...crop, x: startCrop.current.x + dx, y: startCrop.current.y + dy }));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  });  // re-bind every render so crop is current

  return (
    <div style={{
      position: 'relative',
      width: CONTAINER_SIZE,
      height: CONTAINER_SIZE,
      background: '#111',
      borderRadius: 12,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* dim base image */}
      <img
        src={imageSrc}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: offsetX, top: offsetY,
          width: renderedW, height: renderedH,
          opacity: 0.3,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* dark overlay except circle */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        WebkitMaskImage: `radial-gradient(circle ${crop.size / 2}px at ${crop.x + crop.size / 2}px ${crop.y + crop.size / 2}px, transparent 100%, black 100%)`,
        maskImage: `radial-gradient(circle ${crop.size / 2}px at ${crop.x + crop.size / 2}px ${crop.y + crop.size / 2}px, transparent 100%, black 100%)`,
        pointerEvents: 'none',
      }} />

      {/* bright cropped image clipped to circle */}
      <div style={{
        position: 'absolute',
        left: crop.x, top: crop.y,
        width: crop.size, height: crop.size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2.5px solid #C19A6B',
        boxShadow: '0 0 0 1px rgba(193,154,107,0.4)',
        cursor: 'grab',
      }}
        onMouseDown={onDown}
        onTouchStart={onDown}
      >
        <img
          src={imageSrc}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            left: offsetX - crop.x,
            top: offsetY - crop.y,
            width: renderedW,
            height: renderedH,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* border ring */}
      <div style={{
        position: 'absolute',
        left: crop.x, top: crop.y,
        width: crop.size, height: crop.size,
        borderRadius: '50%',
        border: '2.5px solid #C19A6B',
        pointerEvents: 'none',
      }} />

      <p style={{
        position: 'absolute', bottom: 8, left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.55)', fontSize: 12,
        whiteSpace: 'nowrap', pointerEvents: 'none', margin: 0,
      }}>
        Kéo vòng tròn để căn chỉnh vị trí
      </p>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function AvatarAdminPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [natSize, setNatSize] = useState({ w: 1, h: 1 });
  const [crop, setCrop] = useState<CropState>({ x: 0, y: 0, size: 200 });
  const [zoom, setZoom] = useState(0.7);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentUrl, setCurrentUrl] = useState('/api/avatar');
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Recompute crop when zoom changes
  const containerRect = getContainRect(natSize.w, natSize.h, CONTAINER_SIZE);

  const recenterCrop = useCallback((z: number, rect: ReturnType<typeof getContainRect>) => {
    const sz = Math.round(Math.min(rect.renderedW, rect.renderedH) * z);
    const cx = rect.offsetX + (rect.renderedW - sz) / 2;
    const cy = rect.offsetY + (rect.renderedH - sz) / 2;
    setCrop({ x: cx, y: cy, size: sz });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStatus('idle');
    const tmp = new Image();
    tmp.onload = () => {
      imgRef.current = tmp;
      setNatSize({ w: tmp.naturalWidth, h: tmp.naturalHeight });
      const rect = getContainRect(tmp.naturalWidth, tmp.naturalHeight, CONTAINER_SIZE);
      setImageSrc(url);
      recenterCrop(0.7, rect);
      setZoom(0.7);
    };
    tmp.src = url;
  };

  const onZoomChange = (z: number) => {
    setZoom(z);
    const rect = getContainRect(natSize.w, natSize.h, CONTAINER_SIZE);
    const newSize = Math.round(Math.min(rect.renderedW, rect.renderedH) * z);
    // Keep center stable
    const cx = crop.x + crop.size / 2;
    const cy = crop.y + crop.size / 2;
    const nx = Math.max(rect.offsetX, Math.min(cx - newSize / 2, rect.offsetX + rect.renderedW - newSize));
    const ny = Math.max(rect.offsetY, Math.min(cy - newSize / 2, rect.offsetY + rect.renderedH - newSize));
    setCrop({ x: nx, y: ny, size: newSize });
  };

  const handleSave = async () => {
    if (!imageSrc || !imgRef.current) return;
    setStatus('loading');
    try {
      const rect = getContainRect(natSize.w, natSize.h, CONTAINER_SIZE);
      // Map display crop → natural image coords
      const natX = (crop.x - rect.offsetX) / rect.scale;
      const natY = (crop.y - rect.offsetY) / rect.scale;
      const natSz = crop.size / rect.scale;

      const blob = await cropToBlob(imgRef.current, natX, natY, natSz);
      const form = new FormData();
      form.append('file', blob, 'avatar.jpg');
      const res = await fetch('/api/upload-avatar', { method: 'POST', body: form });
      if (res.ok) {
        setStatus('success');
        setCurrentUrl('/api/avatar?t=' + Date.now());
        setImageSrc(null);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>🖼️ Cập nhật Avatar</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* ── Left: upload + crop ── */}
        <div style={{ flex: '1 1 520px', background: 'white', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <p style={{ marginBottom: '1.25rem', color: '#555', lineHeight: 1.6 }}>
            Chọn ảnh → kéo <strong>vòng tròn vàng</strong> để chọn vùng khuôn mặt →
            điều chỉnh <strong>Zoom</strong> → nhấn <strong>Lưu Avatar</strong>.
          </p>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="avatarFile">📂 Chọn ảnh từ máy tính</label>
            <input
              type="file" id="avatarFile" accept="image/*"
              onChange={onFileChange}
              className={styles.input}
              style={{ padding: '0.4rem 0' }}
            />
          </div>

          {imageSrc && (
            <div style={{ marginTop: '1rem' }}>
              <CropOverlay
                imageSrc={imageSrc}
                crop={crop}
                containerRect={containerRect}
                onChange={setCrop}
              />

              <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.label}>
                  🔍 Zoom: {Math.round(zoom * 100)}%
                  &nbsp;<span style={{ fontSize: '0.8rem', color: '#999' }}>
                    (vùng crop: {Math.round(crop.size)}×{Math.round(crop.size)} px hiển thị → lưu {OUTPUT_SIZE}×{OUTPUT_SIZE} px)
                  </span>
                </label>
                <input
                  type="range" min={0.2} max={1} step={0.01}
                  value={zoom}
                  onChange={e => onZoomChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#C19A6B' }}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={status === 'loading'}
                className={styles.submitButton}
                style={{ marginTop: '0.5rem' }}
              >
                {status === 'loading' ? '⏳ Đang lưu...' : '💾 Lưu Avatar'}
              </button>
            </div>
          )}

          {status === 'success' && (
            <p style={{ color: '#155724', background: '#d4edda', padding: '0.75rem 1rem', borderRadius: 8, marginTop: '1rem', fontWeight: 500 }}>
              ✅ Đã lưu! Avatar trang chủ đã được cập nhật.
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#721c24', background: '#f8d7da', padding: '0.75rem 1rem', borderRadius: 8, marginTop: '1rem', fontWeight: 500 }}>
              ❌ Lưu thất bại, thử lại nhé.
            </p>
          )}
        </div>

        {/* ── Right: current preview ── */}
        <div style={{ flex: '0 0 220px', background: 'white', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '1rem', color: '#444' }}>Avatar hiện tại</p>
          <img
            key={currentUrl}
            src={currentUrl}
            alt="Current Avatar"
            style={{
              width: 160, height: 160,
              objectFit: 'cover', objectPosition: 'center',
              borderRadius: '50%',
              border: '3px solid #C19A6B',
              boxShadow: '0 4px 20px rgba(193,154,107,0.3)',
              display: 'block', margin: '0 auto',
            }}
          />
          <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#999' }}>
            Ảnh đang hiển thị trên trang chủ
          </p>
        </div>
      </div>
    </div>
  );
}
