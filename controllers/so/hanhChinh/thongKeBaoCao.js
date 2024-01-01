import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import Report from "../../../models/report.js";
import ReportType from "../../../models/reportType.js";
import AdLocation from "../../../models/adLocation.js";
import AdBoard from "../../../models/adBoard.js";
import mongoose from "mongoose";
import ViolatedPoint from "../../../models/violatedPoint.js";
const { Types } = mongoose;

export const tkBaoCaoXuLy = async (req, res) => {
    const { districtId = null, wardId = null } = req.query;
    try {
        const sumReports = await Report.countDocuments();
        const handleReports = await Report.find({ status: "Đang xử lý" }).countDocuments();
        const doneReports = await Report.find({ status: "Đã xử lý xong" }).countDocuments();

        const ToGiacReport = await ReportType.find({name: "Tố giác sai phạm"});
        const TongToGiacReport = await Report.find({reportType: new Types.ObjectId(ToGiacReport[0]._id)}).countDocuments();

        const DangKyReport = await ReportType.find({name: "Đăng ký nội dung"});
        const TongDangKyReport = await Report.find({reportType: new Types.ObjectId(DangKyReport[0]._id)}).countDocuments();

        const DongGopReport = await ReportType.find({name: "Đóng góp ý kiến"});
        const TongDongGopReport = await Report.find({reportType: new Types.ObjectId(DongGopReport[0]._id)}).countDocuments();

        const GiaiDapReport = await ReportType.find({name: "Giải đáp thắc mắc"});
        const TongGiaiDapReport = await Report.find({reportType: new Types.ObjectId(GiaiDapReport[0]._id)}).countDocuments();

        const TongBaoCaoViPhamDiemQC = await Report.find({randomPoint: {$exists: true}}).countDocuments();
        const TongBaoCaoViPhamBangQC = await Report.find({adBoard: {$exists: true}}).countDocuments();

        let BaoCaoQC = null;
        if (districtId) {
            if (wardId) {
                const ward = await Ward.findById(wardId);
                const district = await District.findById(districtId);
                const adLocation = await AdLocation.find({ district: district._id , ward: ward._id });
                const violatedPoint = await ViolatedPoint.find({ district: district._id , ward: ward._id });
                const adBoard = await AdBoard.find({ $or: [ {adLocation: { $in: adLocation }}, {randomPoint:{ $in: violatedPoint }} ]});
                BaoCaoQC = await Report.find({adBoard: { $in: adBoard }}).populate([
                    {path: "reportType", modal: "ReportType"},
                    {path: "adBoard", modal: "AdBoard"},
                    {path: "randomPoint", modal: "ViolatedPoint"}
                ]);
            } else {
                const adLocation = await AdLocation.find({district: districtId});
                const violatedPoint = await ViolatedPoint.find({ district: districtId});
                const adBoard = await AdBoard.find({ $or: [ {adLocation: { $in: adLocation }}, {randomPoint:{ $in: violatedPoint }} ]});
                BaoCaoQC = await Report.find({adBoard: { $in: adBoard }}).populate([
                    {path: "reportType", modal: "ReportType"},
                    {path: "adBoard", modal: "AdBoard"},
                    {path: "randomPoint", modal: "ViolatedPoint"}
                ]);
            }
        } else {
            BaoCaoQC = await Report.find({}).populate([
                {path: "reportType", modal: "ReportType"},
                {path: "adBoard", modal: "AdBoard"},
                {path: "randomPoint", modal: "ViolatedPoint"}
            ]);
        }
        
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
            BaoCaoQC,
            breadcrumbs,
            wardList,
            districtList,
            districtId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const chiTietBaoCao = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: "Thống kê báo cáo & cách thức xử lý", link: "/so/hanhchinh/thong-ke-bc" },
        { name: "Chi tiết báo cáo", link: "" },
    ];
    try {
        const chiTietBaoCao = await Report.findById(id).populate([
            {path: "reportType", modal: "ReportType"},
            {path: "adBoard", modal: "AdBoard"},
            {path: "randomPoint", modal: "ViolatedPoint"}
        ]);
        console.log("@@ chi tiet bao cao: ", chiTietBaoCao);
    
        res.render("so/hanhChinh/chiTiet/ndChiTietBaoCao.ejs", {
            chiTietBaoCao,
            breadcrumbs,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}