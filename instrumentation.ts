import { registerOTel } from "@vercel/otel";
import { LangfuseExporter } from "langfuse-vercel";

export function register() {
  if (process.env.NODE_ENV !== "development") {
    registerOTel({
      serviceName: "custom-cover-letter",
      traceExporter: new LangfuseExporter(),
    });
  }
}
