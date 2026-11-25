export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  searchKeywords: string[];
  summary: string;
  architecture: {
    problem: string;
    decision: string;
    tradeOff: string;
    result: string;
  };
  keyTakeaways: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'oracle-vps-24gb-mariadb-production-architecture',
    title: 'Hợp nhất & Di trú CSDL S2G về MariaDB cục bộ trên Oracle ARM 24GB VPS',
    excerpt: 'Chuyển đổi từ Cloud DB phân tách sang local MariaDB (s2g_unified, 95 bảng) trên VPS Oracle ARM 4 OCPU / 24 GB RAM phục vụ 1.073+ tài khoản sạch.',
    readTime: '6 phút đọc',
    date: '2026-11-20',
    tags: ['DevOps', 'Oracle Cloud VPS', 'MariaDB', 'Nginx', 'systemd'],
    searchKeywords: [
      'cấu hình vps oracle 24gb',
      'triển khai mariadb ubuntu 24.04',
      'tối ưu csdl cho hệ thống người dùng lớn',
      'kinh nghiệm vận hành vps thực tế'
    ],
    summary: 'Hợp nhất dữ liệu từ các bản cũ về schema s2g_unified chạy trên MariaDB cục bộ tại Oracle ARM VPS (4 OCPU / 24 GB RAM, Ubuntu 24.04, Nginx, systemd).',
    architecture: {
      problem: 'Trước ngày 12/11/2026, S2G và SunStudy chạy trên các TiDB Cloud database tách biệt; khi lượng người dùng S2G tăng từ 116 (08/2026) lên hơn 1.000 tài khoản, việc phụ thuộc hoàn toàn vào database ngoài làm tăng độ phức tạp khi hợp nhất dữ liệu và đối soát season.',
      decision: 'Cấu hình MariaDB cục bộ (`s2g_unified`, `DATABASE_MODE=local-mariadb`) ngay trên Oracle ARM VPS (4 OCPU / 24 GB RAM), giữ nguyên các schema snapshot `archive_s2g_20261112` và `archive_sunstudy_20261112` để đối chiếu, chạy app Next.js + Express qua Nginx và systemd.',
      tradeOff: 'Chấp nhận tự vận hành và sao lưu/rollback database trên một node VPS thay vì dùng managed serverless DB đa vùng; đổi lại không còn phụ thuộc cấu hình fallback TiDB cũ và kiểm soát trực tiếp toàn bộ quá trình migrate.',
      result: 'Hệ thống đang vận hành ổn định 95 bảng dữ liệu với 1.073 tài khoản (loại test/QA), 23.865+ phiên học hợp lệ (28.617+ giờ học), truy vấn thống kê trực tiếp trên MariaDB chỉ mất 0.012 giây.'
    },
    keyTakeaways: [
      'Luôn giữ schema archive snapshot trước khi cutover (`archive_s2g_20261112`) để đảm bảo khả năng kiểm chứng dữ liệu.',
      'Tách riêng môi trường thử nghiệm và chỉ chạy migration cộng thêm (additive) sau khi review kỹ.',
      'Đo đạc trực tiếp bằng read-only aggregate SQL giúp kiểm soát đúng số liệu thực tế.'
    ]
  },
  {
    slug: 'socket-io-realtime-buffer-study-rooms',
    title: 'Cơ chế 60s Write Buffer & Server-Anchor cho Socket.IO phòng học Real-time',
    excerpt: 'Tách WebSocket server riêng (Express + Socket.IO), gom heartbeat ghi DB mỗi 60 giây kết hợp Redis cache và đồng bộ thời gian chống lệch khi rớt mạng.',
    readTime: '5 phút đọc',
    date: '2026-11-15',
    tags: ['WebSocket', 'Socket.IO', 'Node.js', 'Redis', 'Real-time'],
    searchKeywords: [
      'tối ưu websocket socket.io tải cao',
      'giải pháp ghi csdl định kỳ buffer',
      'lập trình phòng học ảo realtime',
      'đồng bộ thời gian server client nodejs'
    ],
    summary: 'Thiết kế Express + Socket.IO server độc lập với cơ chế gom nhịp tim (heartbeat buffering) 60 giây, server-time reconciliation và Redis cache.',
    architecture: {
      problem: 'Trong phòng học ảo real-time, hàng trăm học viên bật timer Pomodoro/Stopwatch cùng lúc. Nếu ghi thẳng mọi nhịp heartbeat xuống database hoặc tính giờ dựa vào đồng hồ thiết bị người dùng, CSDL sẽ chịu áp lực ghi liên tục và dễ lệch giờ khi điện thoại sleep hoặc mất mạng.',
      decision: 'Tách tiến trình Express + Socket.IO riêng, buffer các nhịp heartbeat và flush xuống DB theo chu kỳ 60 giây, kết hợp Redis cache cho user/team/leaderboard và đối soát mốc thời gian (server-time reconciliation) + cross-tab safeguard.',
      tradeOff: 'Nếu tiến trình bị ngắt đột ngột giữa chu kỳ 60 giây, phần delta chưa flush có thể cần phục hồi qua cơ chế session recovery; chấp nhận độ trễ ghi đĩa tối đa 60 giây để tránh ghi dồn dập vào bảng `study_sessions`.',
      result: 'Vận hành ổn định cho 723 học viên đã kích hoạt (67.4% conversion từ tài khoản đăng ký), đạt đỉnh 468 người học active và 11.131 phiên (13.045,9 giờ) trong tháng 10/2026.'
    },
    keyTakeaways: [
      'Buffer heartbeat theo chu kỳ 60s kết hợp Redis cache giúp giảm lặp lại truy vấn lên CSDL chính.',
      'Dùng server-time reconciliation thay vì tin tưởng hoàn toàn vào đồng hồ phía client.',
      'Tách riêng bản ghi `duration_seconds = 0` (lúc bấm start) để không tính nhầm vào thống kê giờ học thực tế.'
    ]
  },
  {
    slug: 'supabase-query-latency-optimization-life-of-study',
    title: 'Giảm độ trễ Dashboard từ 24 giây (35 queries) xuống 2–3 giây trên Supabase',
    excerpt: 'Case study thực tế ở Life of Study (focus.sunstudy.app): tái hiện lỗi waterfall 35 lượt đọc qua Session Pooler eu-west-1, gộp còn 3 câu SQL và sửa race condition Voice.',
    readTime: '6 phút đọc',
    date: '2026-11-24',
    tags: ['PostgreSQL', 'Supabase', 'FastAPI', 'Performance', 'discord.py'],
    searchKeywords: [
      'tối ưu truy vấn supabase chậm',
      'giảm độ trễ postgresql python',
      'discord bot voice tracking',
      'sửa lỗi waterfall query'
    ],
    summary: 'Khắc phục độ chậm 23,7–24,1 giây trên dashboard web và lỗi ngắt nhạc/checkpoint cho bot Discord phục vụ 364 thành viên active (2.501+ giờ Voice) trên VPS 1 GB RAM.',
    architecture: {
      problem: 'Dashboard ban đầu thực hiện khoảng 35 lượt đọc Supabase tuần tự; mỗi lượt qua Session Pooler (`eu-west-1`) từ VPS mất ~0,7 giây, kéo tổng thời gian tải lên 23,7–24,1 giây. Ngoài ra khi token làm mới, request cũ bị chồng và hủy.',
      decision: 'Gộp toàn bộ KPI 4 kỳ, biểu đồ và các mục cá nhân trong một câu PostgreSQL repeatable-read snapshot, giảm xuống còn 3 lượt đọc DB cho API dashboard. Phía client dùng sequence + abort để loại phản hồi cũ, đồng thời đưa logic kiểm tra idle_cleanup vào trong lock của Voice.',
      tradeOff: 'Câu SQL gộp phức tạp hơn và yêu cầu Web lẫn Bot phải dùng chung đúng một bộ tính toán KPI/percent/missing/rank (đã đối soát khớp 100% trên 149 thành viên ở cùng snapshot).',
      result: 'API dashboard giảm từ 23,7–24,1 giây xuống còn 2,0–2,9 giây (đo lại thực tế trên VPS: 2,7–3,1 giây gồm 3 lượt đọc DB); BXH tuần bot còn 0,733 giây; 171 ca pytest và kiểm thử Chrome desktop/mobile đều đạt.'
    },
    keyTakeaways: [
      'Round-trip xuyên vùng (~0,7s/query) sẽ nhân lên thành hơn 24 giây nếu để xảy ra 35 truy vấn tuần tự.',
      'Web và Bot bắt buộc dùng chung nguồn công thức và snapshot để tránh lệch số liệu hiển thị.',
      'Các tác vụ Voice bất đồng bộ cần lock riêng và `playback_id` để tránh callback cũ hủy nhầm bài mới.'
    ]
  },
  {
    slug: 'ai-medical-rag-langgraph-fastapi-vinuni',
    title: 'Xây dựng trợ lý AI Y tế (Carevia) trích dẫn nguyên văn với LangGraph & Decimal Engine',
    excerpt: 'Thiết kế hệ thống tại VinUni AI Thực Chiến (P-033): LLM chỉ chọn passage ID từ FTS5, tính tiền BHYT bằng Python Decimal thuần và giữ ngân sách Token trên TiDB.',
    readTime: '7 phút đọc',
    date: '2026-11-22',
    tags: ['AI Engineering', 'LangGraph', 'FastAPI', 'RAG', 'VinUni AI'],
    searchKeywords: [
      'xây dựng rag với langgraph fastapi',
      'bài toán ai y tế bhyt',
      'vinuni ai thực chiến cohort 5',
      'kỹ thuật kiểm soát token quota llm'
    ],
    summary: 'Kiến trúc hai lớp cho trợ lý hành chính y tế trong team 4 thành viên: tách hoàn toàn bước tính toán viện phí khỏi LLM và khóa trích dẫn theo SHA-256.',
    architecture: {
      problem: 'Tra cứu quy định BHYT (Công văn 2275/BHXH-CSYT) và ước tính đồng chi trả (ngưỡng 379.500đ từ 01/07/2026) không cho phép LLM tự bịa số liệu, tự suy luận ngoài nguồn hoặc làm tràn hạn mức token trên pool key dùng chung.',
      decision: 'Dùng SQLite FTS5 truy xuất đoạn nguồn đang hiệu lực; Mistral Small 4 qua LangGraph chỉ chọn mã đoạn (`passage ID`), tối đa 1 lần sửa định dạng rồi backend tự lấy nguyên văn kèm trang/SHA-256. Luồng tra giá chạy bộ tính Python Decimal xác định (không gọi AI), kèm hạch toán token nguyên tử theo ngày UTC trên TiDB (`3,5 triệu/ngày`).',
      tradeOff: 'Hệ thống từ chối trả lời bằng kiến thức tự nhớ của LLM và chuyển sang luồng hỗ trợ nhân viên khi câu hỏi thiếu căn cứ trong 2 trang Công văn 2275; đánh đổi độ "linh hoạt trả lời mọi thứ" để giữ tính chính xác nguồn.',
      result: 'Bản G2 ngày 18/11 đạt 107 unit test, 20/20 ca API, 7/7 ca tiếng Việt/thiếu nguồn và 7/7 ca replay thực tế với sự phối hợp review chéo trong team 4 thành viên.'
    },
    keyTakeaways: [
      'Tách rời phép tính số học/nghiệp vụ khỏi LLM bằng deterministic Decimal engine.',
      'Để chống bịa trích dẫn, chỉ để LLM chọn ID và để backend trả nguyên văn từ corpus đã kiểm SHA-256.',
      'Guardrail kiểm tra định danh/phạm vi và giữ ngân sách token nguyên tử giúp kiểm soát chi phí lẫn an toàn dữ liệu.'
    ]
  }
];
