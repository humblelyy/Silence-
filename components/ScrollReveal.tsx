'use client';
import { useEffect } from 'react';
export default function ScrollReveal(){useEffect(()=>{const nodes=[...document.querySelectorAll<HTMLElement>('[data-reveal]')];if(!('IntersectionObserver' in window)){nodes.forEach(n=>n.classList.add('is-revealed'));return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});nodes.forEach(n=>observer.observe(n));return()=>observer.disconnect()},[]);return null}
