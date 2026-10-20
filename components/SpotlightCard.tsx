'use client';
import { useRef, type ReactNode, type MouseEvent } from 'react';
export default function SpotlightCard({children, className=''}:{children:ReactNode;className?:string}) { const ref=useRef<HTMLDivElement>(null); function move(e:MouseEvent<HTMLDivElement>){const r=ref.current?.getBoundingClientRect();if(!r||!ref.current)return;ref.current.style.setProperty('--spot-x',`${e.clientX-r.left}px`);ref.current.style.setProperty('--spot-y',`${e.clientY-r.top}px`)} return <div ref={ref} onMouseMove={move} className={`spotlight-card ${className}`}>{children}</div> }
