import Activation from "@/components/views/Auth/Activation/Activation";
import authServices from "@/services/auth.service";

// This is the App Router page component
const ActivationPage = async ({ searchParams }: { searchParams: { code?: string } }) => {
  let status: "success" | "failed" = "failed";
  const params = await searchParams;

  try {
    // Check if code exists in searchParams
    if (params.code) {
      const result = await authServices.activation({ code: params.code });
      if (result.data.data) {
        status = "success";
      }
    }
  } catch {
    status = "failed";
  }
  return <Activation status={status} />;
};

export default ActivationPage;
