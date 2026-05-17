import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Việt Sử Số — Ký Ức Cộng Đồng · Di Sản Số Bền Vững',
  description:
    'Nền tảng học liệu số bảo tồn và lan tỏa ký ức văn hóa Việt Nam thông qua giáo dục phổ thông.',
  keywords: ['lịch sử việt nam', 'học liệu số', 'ký ức cộng đồng', 'di sản số'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  )
}
