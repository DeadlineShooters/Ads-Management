import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import Report from "../../../models/report.js";
import ReportType from "../../../models/reportType.js";
import mongoose from "mongoose";
const { Types } = mongoose;

export const tkBaoCaoXuLy = async (req, res) => {
    try {
        const sumReports = await Report.countDocuments();
        const handleReports = await Report.find({ status: "Đang xử lý" }).countDocuments();
        const doneReports = await Report.find({ status: "Đã xử lý xong" }).countDocuments();

        const ToGiacReport = await ReportType.find({name: "Tố giác sai phạm"});
        const TongToGiacReport = await Report.find({reportType: new Types.ObjectId(ToGiacReport[0]._id)}).countDocuments();

        const DangKyReport = await ReportType.find({name: "Đăng ký nội dung"});
        const TongDangKyReport = await Report.find({reportType: new Types.ObjectId(DangKyReport[0]._id)}).countDocuments();

        const DongGopReport = await ReportType.find({name: "Đăng ký nội dung"});
        const TongDongGopReport = await Report.find({reportType: new Types.ObjectId(DongGopReport[0]._id)}).countDocuments();

        const GiaiDapReport = await ReportType.find({name: "Đăng ký nội dung"});
        const TongGiaiDapReport = await Report.find({reportType: new Types.ObjectId(GiaiDapReport[0]._id)}).countDocuments();

        const TongBaoCaoViPhamDiemQC = await Report.find({randomPoint: {$exists: true}}).countDocuments();
        const TongBaoCaoViPhamBangQC = await Report.find({adBoard: {$exists: true}}).countDocuments();

        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
        });
        const districtList = await District.find({});
        const breadcrumbs = [];

        res.render('so/hanhChinh/dsThongKeBaoCao.ejs', 
        {
            sumReports,
            handleReports,
            doneReports,
            TongToGiacReport,
            TongDangKyReport,
            TongDongGopReport,
            TongGiaiDapReport,
            TongBaoCaoViPhamDiemQC,
            TongBaoCaoViPhamBangQC,
            breadcrumbs,
            wardList,
            districtList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}