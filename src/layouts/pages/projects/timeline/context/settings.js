import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "3ff18302578246aeabfcfe88d31b3f70";
const token =
  "007eJxTYHj40phffk3dJMcpZu8WBsoHaZ1YmP5ZU5//rJrMi7NbvY8qMBinpRlaGBsYmZpbGJmYJaYmJqUlp6VaWKQYGyYZp5kbrNOQSWkIZGRQW9rDysgAgSA+J0NyTmJxcVF+fi4DAwCyeyCL";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
