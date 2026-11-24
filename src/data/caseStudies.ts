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
    solution: string;
    result: string;
  };
  keyTakeaways: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'oracle-vps-24gb-mariadb-production-architecture',
    title: 'Kinh nghiệm kiến trúc VPS Oracle Cloud 24GB ARM & MariaDB phục vụ 1.000+ người dùng thực tế',
    excerpt: 'Cách triển khai Ubuntu 24.04 ARM64, Nginx reverse proxy, gom 95 bảng CSDL về MariaDB cục bộ và tinh chỉnh bộ nhớ đệm phục vụ hơn 23.000 phiên học.',
    readTime: '6 phút đọc',
    date: '2026-11-20',
    tags: ['DevOps', 'Oracle Cloud VPS', 'MariaDB', 'Ubuntu Linux', 'Nginx', 'Systemd'],
    searchKeywords: [
      'cấu hình vps oracle 24gb',
      'triển khai mariadb ubuntu 24.04',
      'deploy nextjs vps oracle arm',
      'tối ưu csdl cho hệ thống người dùng lớn',
      'kinh nghiệm vận hành vps thực tế'
    ],
    summary: 'Bài toán gom CSDL đa nguồn từ TiDB Cloud về máy chủ riêng Oracle Cloud ARM (4 OCPU / 24 GB RAM) giúp giảm thiểu độ trễ mạng xuống dưới 2ms và cắt giảm 100% chi phí máy chủ hàng tháng.',
    architecture: {
      problem: 'Hệ thống S2G ban đầu lưu trữ trên Cloud DB phân tán bị giới hạn kết nối (connection limits) và độ trễ mạng khi lượng học viên truy cập phòng học cùng lúc tăng cao.',
      solution: 'Thiết lập máy chủ Oracle ARM 4 OCPU, phân bổ 12GB RAM cho innodb_buffer_pool_size của MariaDB 11.4 LTS, chạy ứng dụng qua Nginx và systemd service giám sát tự động.',
      result: 'Hệ thống vận hành ổn định phục vụ 1.053+ tài khoản, xử lý 23.865+ phiên học và 28.617+ giờ học với thời gian truy vấn chỉ 0.012s.'
    },
    keyTakeaways: [
      'Tinh chỉnh innodb_buffer_pool_size bằng 50-60% dung lượng RAM máy chủ.',
      'Dùng Unix socket kết nối giữa Nginx và Node.js để tăng thông lượng I/O.',
      'Thiết lập script backup tự động hàng đêm và phân quyền tài khoản quản trị nghiêm ngặt.'
    ]
  },
  {
    slug: 'socket-io-realtime-buffer-study-rooms',
    title: 'Xử lý tải cao Real-time với Socket.IO: Giải pháp bộ đệm 60s Buffer chống nghẽn CSDL',
    excerpt: 'Kỹ thuật tối ưu máy chủ phòng học ảo: đồng bộ đồng hồ server-anchor, gom nhịp tim heartbeat và flush dữ liệu định kỳ thay vì ghi đĩa liên tục.',
    readTime: '5 phút đọc',
    date: '2026-11-15',
    tags: ['WebSocket', 'Socket.IO', 'Node.js', 'High Concurrency', 'Redis'],
    searchKeywords: [
      'tối ưu websocket socket.io tải cao',
      'giải pháp ghi csdl định kỳ buffer',
      'lập trình phòng học ảo realtime',
      'đồng bộ thời gian server client nodejs'
    ],
    summary: 'Khi có hàng trăm học viên cùng bật đồng hồ đếm giờ Pomodoro, nếu mỗi giây gửi 1 request ghi DB thì máy chủ sẽ sập ngay. Cơ chế bộ đệm 60 giây giải quyết triệt để vấn đề này.',
    architecture: {
      problem: 'Ghi nhận thời gian học tập của từng người dùng nếu ghi trực tiếp vào MySQL mỗi 5 giây sẽ gây khóa hàng (row locking) và quá tải CPU máy chủ.',
      solution: 'Tách riêng một tiến trình Express + Socket.IO server độc lập, lưu trạng thái phiên tạm thời trên bộ nhớ RAM, gộp heartbeat và thực hiện bulk write vào DB mỗi 60 giây.',
      result: 'Giảm tải hơn 92% số lượng truy vấn I/O ghi đĩa, duy trì kết nối thời gian thực ổn định không giật lag cho 775+ học viên tích cực.'
    },
    keyTakeaways: [
      'Không bao giờ ghi DB trực tiếp theo từng tick thời gian của client.',
      'Sử dụng thuật toán Server-anchored timestamp để chống gian lận chỉnh giờ máy tính.',
      'Cơ chế tự động khôi phục phiên (session recovery) khi người dùng đổi mạng hoặc tắt màn hình điện thoại.'
    ]
  },
  {
    slug: 'ai-medical-rag-langgraph-fastapi-vinuni',
    title: 'Xây dựng trợ lý AI Hành chính Y tế (Carevia) với LangGraph, FastAPI & Grounded RAG',
    excerpt: 'Kinh nghiệm làm việc nhóm tại VinUni AI Thực Chiến: Thiết kế pipeline tra cứu BHYT chuẩn xác 100% trích dẫn nguồn, an toàn PII và hạch toán ngân sách Token.',
    readTime: '7 phút đọc',
    date: '2026-11-22',
    tags: ['AI Engineering', 'LangGraph', 'FastAPI', 'RAG', 'VinUni AI', 'Healthcare'],
    searchKeywords: [
      'xây dựng rag với langgraph fastapi',
      'bài toán ai y tế bhyt',
      'vinuni ai thực chiến cohort 5',
      'trợ lý hành chính y tế ai',
      'kỹ thuật kiểm soát token quota llm'
    ],
    summary: 'Bài toán tra cứu quy định Bảo hiểm Y tế đòi hỏi độ chính xác tuyệt đối. Hệ thống sử dụng mô hình LangGraph có kiểm chứng, từ chối câu trả lời suy đoán và trích xuất nguyên văn văn bản pháp luật.',
    architecture: {
      problem: 'LLM thông thường hay gặp hiện tượng bịa đặt (hallucination) và tính toán sai tiền viện phí, gây rủi ro pháp lý nghiêm trọng trong y tế.',
      solution: 'Tách riêng bộ tính tiền bảo hiểm theo thuật toán xác định (Deterministic Decimal Engine) và luồng AI chỉ đóng vai trò trích dẫn số trang/văn bản kèm mã hash SHA-256 đối soát.',
      result: 'Vượt qua 107 bài unit test tự động, đạt 20/20 ca kiểm thử chuẩn (Golden Cases) và được nghiệm thu tại chương trình VinUni AI Thực Chiến.'
    },
    keyTakeaways: [
      'Tách rời việc tính toán số học khỏi LLM để loại bỏ 100% sai sót tiền bạc.',
      'Cơ chế Guardrails kiểm duyệt dữ liệu cá nhân (PII) trước khi đẩy vào mô hình AI.',
      'Thiết lập hạn mức Token hàng ngày (Daily Token Quota) trong CSDL để kiểm soát chi phí API.'
    ]
  }
];
