import Sidebar from '@/src/components/sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../src/styles/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Planner',
  description: 'Application that allows you to plan tasks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Container>
          <Row>
            <Col xs={3} xl={2}>
              <Sidebar>
                <Link href="/">All Tasks</Link>
                <Link href="/planner">Planner</Link>
              </Sidebar>
            </Col>

            <Col className='main-content p-5'>
              {children}
            </Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}
