import { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, message, Select, Divider } from 'antd';
import {
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    SendOutlined,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
    GlobalOutlined,
    MessageOutlined,
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestCreateContact } from '../config/ContactRequest';

const { TextArea } = Input;
const { Option } = Select;

function Contact() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            console.log(values);

            await requestCreateContact(values);
            message.success('Cảm ơn bạn đã liên hệ ViVuTravel! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            form.resetFields();
        } catch (error) {
            message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <PhoneOutlined className="text-2xl text-blue-600" />,
            title: 'Điện Thoại',
            details: ['+84 24 1234 5678', '+84 24 8765 4321'],
            description: 'Hỗ trợ 24/7',
        },
        {
            icon: <MailOutlined className="text-2xl text-green-600" />,
            title: 'Email',
            details: ['hotro@vivutravel.vn', 'booking@vivutravel.vn'],
            description: 'Phản hồi trong 2 giờ',
        },
        {
            icon: <EnvironmentOutlined className="text-2xl text-red-600" />,
            title: 'Địa Chỉ',
            details: ['123 Đường ABC, Quận 1', 'TP. Hồ Chí Minh, Việt Nam'],
            description: 'Trung tâm thành phố',
        },
        {
            icon: <ClockCircleOutlined className="text-2xl text-purple-600" />,
            title: 'Giờ Làm Việc',
            details: ['Thứ 2 - Thứ 6: 8:00 - 18:00', 'Thứ 7 - CN: 9:00 - 17:00'],
            description: 'Hỗ trợ trực tuyến 24/7',
        },
    ];

    const socialMedia = [
        { icon: <FacebookOutlined />, name: 'Facebook', color: 'text-blue-600', url: '#' },
        { icon: <InstagramOutlined />, name: 'Instagram', color: 'text-pink-600', url: '#' },
        { icon: <TwitterOutlined />, name: 'Twitter', color: 'text-blue-400', url: '#' },
        { icon: <YoutubeOutlined />, name: 'YouTube', color: 'text-red-600', url: '#' },
        { icon: <LinkedinOutlined />, name: 'LinkedIn', color: 'text-blue-700', url: '#' },
    ];

    const departments = [
        {
            name: 'Đặt Tour',
            phone: '+84 24 1234 5678',
            email: 'booking@vivutravel.vn',
            description: 'Tư vấn và hỗ trợ đặt tour',
        },
        {
            name: 'Chăm Sóc Khách Hàng',
            phone: '+84 24 1234 5679',
            email: 'support@vivutravel.vn',
            description: 'Giải đáp thắc mắc & hỗ trợ sau đặt tour',
        },
        {
            name: 'Đối Tác & Hợp Tác',
            phone: '+84 24 1234 5680',
            email: 'partner@vivutravel.vn',
            description: 'Hợp tác kinh doanh & đại lý',
        },
        {
            name: 'Tuyển Dụng',
            phone: '+84 24 1234 5681',
            email: 'hr@vivutravel.vn',
            description: 'Cơ hội nghề nghiệp tại ViVuTravel',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <header>
                <Header />
            </header>

            <main>
                {/* Hero Section */}
                <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="text-center text-white max-w-4xl mx-auto px-4">
                            <h1 className="text-4xl font-bold mb-4">Liên Hệ ViVuTravel</h1>
                            <p className="text-xl mb-8">
                                ViVuTravel luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên mọi hành trình khám phá.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <MessageOutlined className="mr-2" />
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <GlobalOutlined className="mr-2" />
                                    <span>Đa ngôn ngữ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form & Info */}
                <div className="container mx-auto px-4 py-16">
                    <Row gutter={[32, 32]}>
                        {/* Contact Form */}
                        <Col xs={24} lg={14}>
                            <Card className="shadow-lg">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Gửi Tin Nhắn</h2>
                                    <p className="text-gray-600">
                                        Vui lòng để lại thông tin, đội ngũ ViVuTravel sẽ phản hồi và hỗ trợ bạn trong
                                        thời gian sớm nhất.
                                    </p>
                                </div>

                                <Form form={form} layout="vertical" onFinish={onFinish} className="contact-form">
                                    <Row gutter={24}>
                                        <Col xs={24} sm={24}>
                                            <Form.Item
                                                name="fullName"
                                                label="Họ và tên"
                                                rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                                            >
                                                <Input
                                                    prefix={<UserOutlined />}
                                                    placeholder="Nhập họ và tên của bạn"
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                rules={[
                                                    { required: true, message: 'Vui lòng nhập email!' },
                                                    { type: 'email', message: 'Email không hợp lệ!' },
                                                ]}
                                            >
                                                <Input
                                                    prefix={<MailOutlined />}
                                                    placeholder="your@email.com"
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Số Điện Thoại"
                                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                            >
                                                <Input
                                                    prefix={<PhoneOutlined />}
                                                    placeholder="+84 xxx xxx xxx"
                                                    size="large"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="message"
                                        label="Tin Nhắn"
                                        rules={[{ required: true, message: 'Vui lòng nhập tin nhắn!' }]}
                                    >
                                        <TextArea
                                            rows={6}
                                            placeholder="Nhập tin nhắn của bạn..."
                                            showCount
                                            maxLength={500}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 border-none"
                                            icon={<SendOutlined />}
                                        >
                                            Gửi Tin Nhắn
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                        {/* Contact Information */}
                        <Col xs={24} lg={10}>
                            <div className="space-y-6">
                                <Card className="shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Thông Tin Liên Hệ</h3>
                                    <div className="space-y-4">
                                        {contactInfo.map((info, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 mt-1">{info.icon}</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                                                    {info.details.map((detail, idx) => (
                                                        <p key={idx} className="text-gray-600 text-sm">
                                                            {detail}
                                                        </p>
                                                    ))}
                                                    <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Departments */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Các Bộ Phận</h2>
                            <p className="text-xl text-gray-600">Liên hệ trực tiếp với bộ phận phù hợp</p>
                        </div>

                        <Row gutter={[24, 24]}>
                            {departments.map((dept, index) => (
                                <Col xs={24} sm={12} lg={6} key={index}>
                                    <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="text-3xl text-blue-600 mb-3">
                                            <HomeOutlined />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{dept.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                                        <div className="space-y-1">
                                            <p className="text-sm text-blue-600 font-semibold">{dept.phone}</p>
                                            <p className="text-sm text-gray-500">{dept.email}</p>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* Map Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Văn Phòng ViVuTravel</h2>
                        <p className="text-xl text-gray-600">Tìm đường đến văn phòng đại diện của ViVuTravel</p>
                    </div>

                    <Card className="shadow-lg">
                        <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <EnvironmentOutlined className="text-6xl text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Bản Đồ Tương Tác</h3>
                                <p className="text-gray-600 mb-4">459 Tôn Đức Thắng, Phường Hòa Khánh, Đà Nẵng</p>
                                <Button type="primary" size="large">
                                    Xem Trên Google Maps
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* FAQ Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Câu Hỏi Thường Gặp</h2>
                            <p className="text-xl text-gray-600">Những câu hỏi phổ biến từ khách hàng</p>
                        </div>

                        <Row gutter={[24, 24]}>
                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">Làm thế nào để đặt tour?</h4>
                                    <p className="text-gray-600 text-sm">
                                        Bạn có thể đặt tour trực tiếp trên website ViVuTravel, hoặc liên hệ hotline để
                                        được tư vấn chi tiết.
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        Quy trình thanh toán & xác nhận tour như thế nào?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Sau khi thanh toán thành công, hệ thống sẽ gửi email xác nhận và thông tin chi
                                        tiết về hành trình của bạn.
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        ViVuTravel có hỗ trợ đưa đón không?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Có, chúng tôi cung cấp dịch vụ đưa đón sân bay với giá ưu đãi. Vui lòng đặt
                                        trước khi đến.
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">Chính sách hủy tour như thế nào?</h4>
                                    <p className="text-gray-600 text-sm">
                                        Chính sách hủy tùy thuộc vào từng tour cụ thể. Vui lòng xem chi tiết trong phần
                                        điều khoản của tour hoặc liên hệ chúng tôi để được hỗ trợ.
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        Tôi có thể thay đổi ngày khởi hành sau khi đặt tour không?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Trong một số trường hợp, bạn có thể thay đổi ngày khởi hành tùy theo điều kiện
                                        của từng tour. Vui lòng liên hệ sớm với ViVuTravel để được hỗ trợ tốt nhất.
                                    </p>
                                </Card>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        Giá tour đã bao gồm những chi phí nào?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Giá tour thường bao gồm vé tham quan, phương tiện di chuyển, lưu trú, hướng dẫn
                                        viên và một số bữa ăn theo chương trình. Chi tiết sẽ được ghi rõ trong phần mô
                                        tả tour.
                                    </p>
                                </Card>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        Tôi có cần đặt cọc trước khi tham gia tour không?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Tùy vào từng tour, bạn có thể cần thanh toán toàn bộ hoặc đặt cọc trước một phần
                                        chi phí. Thông tin thanh toán sẽ được hiển thị rõ ràng trước khi bạn xác nhận
                                        đặt tour.
                                    </p>
                                </Card>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Card className="shadow-lg">
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        ViVuTravel có hỗ trợ khách đoàn hoặc tour riêng không?
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        Có. Chúng tôi cung cấp dịch vụ thiết kế tour riêng theo yêu cầu cho gia đình,
                                        công ty hoặc nhóm bạn. Vui lòng liên hệ để được tư vấn chi tiết và báo giá phù
                                        hợp.
                                    </p>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Contact;
