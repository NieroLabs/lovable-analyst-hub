const N8N_WEBHOOK_URL =
  "https://negociaai.app.n8n.cloud/webhook-test/106e6ae1-831a-4c46-9ac6-67952dc16132";

export const uploadToN8N = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("data", file);

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar arquivo para N8N");
  }
};
