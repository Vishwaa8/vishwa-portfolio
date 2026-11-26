import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Vishwa Muthukudaarachchi | Portfolio', description: 'Software Development & Project Management — personal portfolio of Vishwa Muthukudaarachchi.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="en" suppressHydrationWarning><body><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch(e){}"}}/>{children}</body></html>}
