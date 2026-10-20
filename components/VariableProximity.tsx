'use client';
import { useRef, type MouseEvent } from 'react';
type Props = { label: string; className?: string; radius?: number; fontSize?: number; fromWeight?: number; toWeight?: number };
export default function VariableProximity({ label, className = '', radius = 100, fontSize = 64, fromWeight = 400, toWeight = 850 }: Props) {
 const ref = useRef<HTMLSpanElement>(null);
 function move(e: MouseEvent<HTMLSpanElement>) { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const d = Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2)); const p = Math.max(0,1-d/radius); el.style.fontVariationSettings = `'wght' ${Math.round(fromWeight+(toWeight-fromWeight)*p)}`; el.style.transform = `translateY(${-p*3}px)`; }
 function reset(){if(ref.current){ref.current.style.fontVariationSettings=`'wght' ${fromWeight}`;ref.current.style.transform='translateY(0)';}}
 return <span ref={ref} className={`variable-proximity ${className}`} onMouseMove={move} onMouseLeave={reset} style={{fontSize, fontVariationSettings:`'wght' ${fromWeight}`}}>{label}</span>;
}
