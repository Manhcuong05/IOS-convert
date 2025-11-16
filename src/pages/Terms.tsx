import { Page, Text, Button, Box, Checkbox } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Terms() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <Page className="bg-white min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="bg-green-600 text-white text-center py-3 shadow-md">
        <Text className="text-lg font-semibold tracking-wide">FECredit</Text>
      </div>

      <Box className="px-5 pt-6 pb-12">
        {/* ================= TITLE ================= */}
        <Text className="text-center text-lg font-bold mb-4">
          Điều khoản đăng ký Vay
        </Text>

        {/* ================= FE LOGO ================= */}
        <div className="flex justify-center mb-4">
          <Text className="text-3xl font-extrabold text-green-600 tracking-wider">
            FE CREDIT
          </Text>
        </div>

        {/* ================= MAIN TERMS CONTENT ================= */}
        <Text className="text-base leading-relaxed text-gray-700 mb-6">
          Bằng cách bấm <Text className="font-semibold">"Đồng ý"</Text>, Quý khách xác nhận hiểu rõ và đồng ý:
          <br />
          <br />
          • Thông tin của Quý khách sẽ được Công ty Tài chính FE CREDIT (FE CREDIT)
          thu thập và xử lý nhằm mục đích xem xét và cung cấp dịch vụ tài chính
          của FE CREDIT cho Quý khách.
          <br />
          <br />
          • Trong thời gian FE CREDIT thẩm định hồ sơ nhằm mục đích phát hành khoản vay
          theo đề nghị của Quý khách, dữ liệu cá nhân của Quý khách sẽ được kiểm soát,
          xử lý bởi FE CREDIT và các cá nhân, tổ chức khác theo quy định của pháp luật.
          <br />
          <br />
          • Quý khách đồng ý với{" "}
          <Text className="font-semibold text-green-700">
            Điều kiện Điều khoản
          </Text>{" "}
          về bảo vệ dữ liệu cá nhân của FE CREDIT.
        </Text>

        {/* ================= CHECKBOX FOLLOW OA ================= */}
        <div className="flex items-center mb-5">
          <Checkbox
            value="oa"
            checked={checked}
            onChange={(e: { target: { checked: boolean } }) =>
              setChecked(e.target.checked)
            }
          />
          <Text className="ml-3 text-sm text-gray-800">
            Đồng ý theo dõi Official Account
          </Text>
        </div>

        {/* ================= OA BLOCK ================= */}
        <div className="border border-gray-300 bg-gray-100 rounded-xl p-4 mb-8">
          <Text className="text-green-700 font-bold text-base">
            FE CREDIT trên Zalo
          </Text>
          <Text className="text-gray-600 text-sm">Official Account</Text>
        </div>

        {/* ================= BUTTON ================= */}
        <Button
          className="w-full bg-green-600 text-white font-bold text-lg py-3 rounded-full shadow-lg active:scale-95"
          size="large"
          disabled={!checked}
          onClick={() => navigate("/loan")}
        >
          Đồng ý
        </Button>
      </Box>
    </Page>
  );
}
