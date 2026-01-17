import { Box, Container } from "@mui/material";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
