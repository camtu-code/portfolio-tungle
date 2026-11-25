'use client';

import React, { useState, useRef } from 'react';
import { Mail, MapPin, Send, MessageSquareHeart, Phone } from 'lucide-react';
import { submitContactMessage } from '@/app/actions';
import { submitTestimonial } from '@/app/actions/testimonial';

export default function Contact() {
  const [tab, setTab] = useState<'contact' | 'guestbook'>('contact');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestStatus, setGuestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestError, setGuestError] = useState<string>('');
  
  const contactFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactStatus('loading');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await submitContactMessage(formData);
      if (res.success) {
        setContactStatus('success');
        contactFormRef.current?.reset();
        setTimeout(() => setContactStatus('idle'), 5000);
      } else {
        setContactStatus('error');
        setTimeout(() => setContactStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 5000);
    }
  }

  async function handleGuestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuestStatus('loading');
    setGuestError('');
    try {
      const formData = new FormData(e.currentTarget);
      formData.set('rating', '5');
      const res = await submitTestimonial(formData);
      if (res.success) {
        setGuestStatus('success');
        guestFormRef.current?.reset();
        setTimeout(() => setGuestStatus('idle'), 5000);
      } else {
        setGuestError(res.error || 'Error submitting.');
        setGuestStatus('error');
        setTimeout(() => setGuestStatus('idle'), 6000);
      }
    } catch (error) {
      console.error(error);
      setGuestError('Error submitting.');
      setGuestStatus('error');
      setTimeout(() => setGuestStatus('idle'), 5000);
    }
  }

  return (
    <section id="contact" className="flex flex-col gap-8 pb-12 border-b-2 border-zinc-300 dark:border-zinc-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Get In Touch</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Available for new opportunities and collaborations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <Mail size={16} className="text-zinc-400 dark:text-zinc-500" />
              <a href="mailto:lethanhtung6803@gmail.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                lethanhtung6803@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <Phone size={16} className="text-zinc-400 dark:text-zinc-500" />
              <a href="https://zalo.me/0848290617" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                0848 290 617 (Zalo)
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPin size={16} className="text-zinc-400 dark:text-zinc-500" />
              <span>Hanoi, Vietnam</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
            <p>Feel free to reach out if you want to build something together, have a question, or just want to connect.</p>
            <p className="mt-2 text-zinc-400 dark:text-zinc-500 italic">💬 If you find my portfolio impressive, feel free to leave a testimonial!</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg w-fit">
            <button
              onClick={() => setTab('contact')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                tab === 'contact' 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Send size={14} /> Send Message
            </button>
            <button
              onClick={() => setTab('guestbook')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                tab === 'guestbook' 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <MessageSquareHeart size={14} /> Leave Testimonial
            </button>
          </div>

          {/* Form Content */}
          {tab === 'contact' ? (
            <form ref={contactFormRef} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleContactSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  required
                  className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  required
                  className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
                />
              </div>
              <textarea 
                name="message"
                placeholder="Message" 
                rows={4}
                required
                className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors resize-none"
              ></textarea>
              <div className="flex items-center gap-4">
                <button 
                  type="submit" 
                  disabled={contactStatus === 'loading'}
                  className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {contactStatus === 'success' && <span className="text-sm text-green-600 dark:text-green-500 font-medium">Message sent!</span>}
                {contactStatus === 'error' && <span className="text-sm text-red-600 dark:text-red-500 font-medium">Error sending message.</span>}
              </div>
            </form>
          ) : (
            <form ref={guestFormRef} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleGuestSubmit}>
              {/* Honeypot anti-spam field */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {/* Complete guide for both students & teammates */}
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2.5">
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Gợi ý viết nhận xét thật tế (có thể viết hoàn toàn bằng tiếng Việt):
                </p>

                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 text-[11px] mb-1">
                    1. Dành cho Học sinh / Sinh viên / Người dùng:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <li>Em/bạn đã dùng sản phẩm nào của Tùng (S2G, Life of Study, CogniAssess, Prelynx...) và dùng khoảng bao lâu?</li>
                    <li>Điểm nào em thấy ổn định hoặc hữu ích nhất? (VD: đếm giờ không bị mất khi rớt mạng, phòng học mượt, nhắc KPI đúng giờ...)</li>
                    <li>Khi web/bot gặp lỗi, tốc độ Tùng hỗ trợ và sửa lỗi như thế nào? Có điều gì cần cải thiện thêm không?</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-200 text-[11px] mb-1">
                    2. Dành cho Đồng đội / Mentor làm việc chung:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <li>Khi làm việc chung (VD: dự án Carevia P-033...), Tùng có điểm mạnh và điểm yếu / điểm cần cải thiện gì?</li>
                    <li>Ấn tượng về khả năng triển khai thực tế, xử lý sự cố và phối hợp nhóm ra sao?</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Tên của bạn / Your Name *" 
                  required
                  className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
                />
                <input 
                  type="text" 
                  name="inviteCode"
                  placeholder="Mã mời (Invite Code) *" 
                  required
                  className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors font-mono"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  name="product"
                  defaultValue=""
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
                >
                  <option value="" disabled>Chọn sản phẩm / ngữ cảnh *</option>
                  <option value="S2G Study (s2g.io.vn)">S2G Study (s2g.io.vn)</option>
                  <option value="Life of Study (focus.sunstudy.app)">Life of Study (focus.sunstudy.app)</option>
                  <option value="CogniAssess (cna.io.vn)">CogniAssess (cna.io.vn)</option>
                  <option value="Carevia AI (VinUni P-033)">Carevia AI (VinUni P-033)</option>
                  <option value="Prelynx (pre.sunstudy.app)">Prelynx (pre.sunstudy.app)</option>
                  <option value="Teammate / Mentor">Đồng đội / Mentor kỹ thuật</option>
                </select>
                <input 
                  type="text" 
                  name="role"
                  placeholder="Vai trò (VD: Học sinh THPT, SV, Teammate)" 
                  className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
                />
              </div>

              <input 
                type="text" 
                name="company"
                placeholder="Trường / Team / Số giờ học (VD: 65h trên S2G, Team P-033)" 
                className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
              />
              <textarea 
                name="message"
                placeholder="Chia sẻ trải nghiệm thực tế của bạn (tối thiểu 20 ký tự) *" 
                rows={4}
                required
                className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors resize-none"
              ></textarea>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  type="submit" 
                  disabled={guestStatus === 'loading'}
                  className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <MessageSquareHeart size={16} /> {guestStatus === 'loading' ? 'Submitting...' : 'Submit Testimonial'}
                </button>
                {guestStatus === 'success' && <span className="text-sm text-green-600 dark:text-green-500 font-medium">Đã gửi! Chờ admin duyệt hiển thị.</span>}
                {guestStatus === 'error' && <span className="text-sm text-red-600 dark:text-red-500 font-medium">{guestError || 'Error submitting.'}</span>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
