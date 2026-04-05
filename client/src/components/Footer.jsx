import { Twitter, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-12 relative overflow-hidden">
            {/* Glow effect nhẹ phía trên */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70"></div>

            <div className="w-[80%] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* ================= CỘT 1 ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-white font-semibold mb-4 text-lg">ViVuTravel</h3>

                    <p className="text-sm mb-6 leading-relaxed text-gray-400">
                        ViVuTravel đồng hành cùng bạn trên mọi hành trình, mang đến trải nghiệm du lịch đáng nhớ, dịch
                        vụ tận tâm và giá trị vượt mong đợi.
                    </p>

                    <div className="flex space-x-3">
                        <a
                            href="#"
                            className="p-2 rounded-full bg-neutral-800 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-neutral-800 hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-neutral-800 hover:bg-pink-600 transition-all duration-300 hover:scale-110"
                        >
                            <Instagram size={18} />
                        </a>
                    </div>
                </motion.div>

                {/* ================= CỘT 2 ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-white font-semibold mb-4 text-lg">Thông tin liên hệ</h3>

                    <ul className="space-y-3 text-sm text-gray-400">
                        <li>📍 459 Tôn Đức Thắng, Phường Hòa Khánh, Đà Nẵng</li>
                        <li>📞 1900 1234</li>
                        <li>✉️ hotro@vivutravel.vn</li>
                        <li>
                            🕒 Giờ làm việc:
                            <ul>
                                <li>Thứ 2 – Thứ 6: 08:00 – 18:00</li>
                                <li>Thứ 7 – Chủ nhật: 09:00 – 17:00</li>
                            </ul>
                        </li>
                    </ul>
                </motion.div>

                {/* ================= CỘT 3 ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-white font-semibold mb-4 text-lg">Điểm đến phổ biến</h3>

                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-white transition-colors cursor-pointer">• Đà Nẵng</li>
                        <li className="hover:text-white transition-colors cursor-pointer">• Nha Trang</li>
                        <li className="hover:text-white transition-colors cursor-pointer">• Phú Quốc</li>
                        <li className="hover:text-white transition-colors cursor-pointer">• Sa Pa</li>
                        <li className="hover:text-white transition-colors cursor-pointer">• Hạ Long</li>
                    </ul>
                </motion.div>

                {/* ================= CỘT 4 ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-white font-semibold mb-4 text-lg">Đăng ký nhận ưu đãi</h3>

                    <p className="text-sm mb-4 text-gray-400">
                        Nhận thông tin tour mới và ưu đãi đặc biệt từ ViVuTravel.
                    </p>

                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-4 py-2 rounded-l-lg bg-neutral-800 text-white placeholder-gray-500 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg text-white hover:opacity-90 transition">
                            Gửi
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-gray-500 mt-12 border-t border-neutral-800 pt-6">
                © {new Date().getFullYear()} ViVuTravel. All rights reserved.
            </div>
        </footer>
    );
}
