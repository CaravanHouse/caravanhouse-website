import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFD98A 0%, #F6B73C 55%, #E0891B 100%)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M7.5 20.5 16 9.5l8.5 11" fill="none" stroke="#1A1204" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.75 24v-3.25a3.25 3.25 0 0 1 6.5 0V24" fill="none" stroke="#1A1204" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
