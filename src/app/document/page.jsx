"use client";

import BorderBox from "@/components/border-box";
import MyBreadcrumbList from "@/components/breadcrumb-list";

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Document", href: "/document" },
];

const FundamentalPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <MyBreadcrumbList breadcrumb={breadcrumb} />
      <BorderBox title="Crystal document" color="primary">
        <div className="flex flex-col gap-4 p-4">
          <p>Tính cấp thiết của đề tài</p>
          <BorderBox>
            <div className="text-muted-foreground">
              <p>
                {`Trong lĩnh vực công nghệ hóa học, sinh học và dược phẩm, kích thước hạt của các sản phẩm dạng bột và hạt (bên cạnh độ tinh khiết) đóng vai trò vô cùng quan trọng. Chẳng hạn, kích thước hạt ảnh hưởng trực tiếp đến quá trình hòa tan của thuốc cũng như quá trình gia công tạo viên nén. Do vậy, việc xác định kích thước hạt một chính xác và nhanh chóng có ý nghĩa rất to lớn. Một số vấn đề đặc biệt liên quan đến xác định kích thước đặc trưng của hạt có thể được tóm lược như sau:`}
              </p>
              <ul>
                <li>
                  1. Về số lượng hạt cần khảo sát: Kích thước của hệ đa phân tán
                  chỉ có ý nghĩa đối với một tập hợp các hạt nhất định. Tính ý
                  nghĩa thống kê của mẫu càng gia tăng khi số lượng hạt trong
                  tập càng lớn, đôi khi có thể lên đến hàng trăm, hàng nghìn,
                  thậm chí hàng triệu hạt. Kết quả của quá trình này thường được
                  biểu diễn dưới dạng PSD - phân phối kích thước hạt (particle
                  size distribution).
                </li>
                <li>
                  2. Về phương pháp: Phương pháp đo thủ công truyền thống thông
                  qua việc lấy mẫu định kỳ và pha loãng mẫu (nếu cần thiết) cho
                  thấy có nhiều hạn chế như: nhiều công đoạn thủ công tiêu tốn
                  nhiều thời gian và có sai số thô lớn, do vậy thời gian hồi
                  tiếp sẽ kéo dài. Do đó, phương pháp này không phù hợp khi
                  nghiên cứu động học của các hệ xảy ra với tốc độ cao như quá
                  trình sinh mầm tinh thể, quá trình hình thành các giọt lỏng
                  trong hệ nhũ tương, v.v.
                </li>
                <li>
                  {" "}
                  3. Độ chính xác bị ảnh hưởng do các tinh thể bị nứt vỡ do sốc
                  nhiệt, chồng lấn, kết dính vào nhau trong quá trình kết tinh.
                  Điều này đòi hỏi một phương pháp nhận diện có thể xác định
                  được hình thái của tinh thể toàn phần (bao gồm cả phần nhìn
                  thấy và bị che khuất / khuyết tật).
                </li>
              </ul>
              <p>
                {`Những vấn đề trên dẫn đến nhu cầu về một hệ thống đo sử dụng các công nghệ hiện đại hơn cho phép xử lý các sự kiện
              trong thời gian thực cũng như giữ nguyên điều kiện nguyên bản của
              dung dịch vì thời gian hồi tiếp nhanh và không cần thiết phải lấy
              mẫu hay pha loãng mẫu thủ công. Bên cạnh đó, cách mạng 4.0 đang
              diễn ra ở hầu hết các lĩnh vực khoa học công nghệ, trí tuệ nhân
              tạo (Artificial Intelligence - AI) đang trở nên ngày càng hoàn
              thiện và đóng một vai trò quan trọng trong nhiều lĩnh vực khác
              nhau. Trong xu thế đó, công nghệ học máy (machine learning) thể
              hiện sự thích hợp đặc biệt cho lĩnh vực khoa học kết tinh, nhất là
              bởi vì sự phức tạp của các hệ tinh thể và số lượng lớn các tinh
              thể (hàng triệu hạt) là không thể phân tích một cách thủ công hoặc
              sử dụng các công nghệ cũ. Ngoài ra, lĩnh vực thị giác máy tính sử
              dụng học máy và học sâu trong các năm qua đạt được nhiều thành tựu
              to lớn, hoàn toàn đáp ứng được các yêu cầu kỹ thuật cho bài toán
              xác định kích thước tinh thể thay cho các phương pháp thủ công
              hiện tại. Như vậy, ứng dụng thị giác máy tính để nhận diện và thu
              thập kích thước của tập tinh thể là một đề tài hết sức khả thi và
              có tính ứng dụng cao. Điều này đặc biệt có ý nghĩa cho các hệ phức
              tạp, đa hình thái và có mật độ cao vốn đóng vai trò rất quan trọng
              trong kỹ thuật kết tinh dược phẩm.`}
              </p>
            </div>
          </BorderBox>
        </div>
      </BorderBox>
    </div>
  );
};

export default FundamentalPage;
