"use client";

import { useState, useCallback, useEffect, useRef } from "react";

function generateCaptcha(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let text = "";
  for (let i = 0; i < 4; i++) text += chars[Math.floor(Math.random() * chars.length)];
  return text;
}

export default function Captcha({ value, onChange, onCode }: { value: string; onChange: (v: string) => void; onCode: (code: string) => void }) {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnRef = useRef(false);

  const draw = useCallback((t: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawnRef.current = true;

    canvas.width = 120;
    canvas.height = 44;
    ctx.clearRect(0, 0, 120, 44);

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, 120, 44);

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(156,163,175,${0.2 + Math.random() * 0.3})`;
      ctx.lineWidth = 1;
      ctx.moveTo(Math.random() * 120, Math.random() * 44);
      ctx.lineTo(Math.random() * 120, Math.random() * 44);
      ctx.stroke();
    }

    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(156,163,175,${Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 120, Math.random() * 44, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,0.05)";
    ctx.shadowBlur = 2;

    for (let i = 0; i < t.length; i++) {
      const x = 20 + i * 24;
      const y = 22 + (Math.random() - 0.5) * 6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.3);
      ctx.font = `${20 + Math.random() * 4}px "Courier New", monospace`;
      ctx.fillStyle = ["#1f2937", "#374151", "#4b5563", "#dc2626", "#2563eb"][Math.floor(Math.random() * 5)];
      ctx.fillText(t[i], 0, 0);
      ctx.restore();
    }
  }, []);

  const refresh = useCallback(() => {
    const t = generateCaptcha();
    setText(t);
    onCode(t);
    onChange("");
    drawnRef.current = false;
  }, [onCode, onChange]);

  useEffect(() => {
    if (!text) { refresh(); return; }
    if (!drawnRef.current) draw(text);
  }, [text, draw, refresh]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="验证码"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-11 rounded-xl border border-input bg-transparent px-3 text-sm flex-1 outline-none focus-visible:ring-1 focus-visible:ring-black/15"
      />
      <canvas
        ref={canvasRef}
        width={120}
        height={44}
        onClick={refresh}
        className="rounded-lg border cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        title="点击刷新"
      />
      <button type="button" onClick={refresh} className="text-xs text-muted-foreground hover:text-black shrink-0">
        换一张
      </button>
    </div>
  );
}
