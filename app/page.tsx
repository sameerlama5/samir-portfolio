import { Providers } from "./providers"
import { IntroAnimation } from "./components/animations/intro-animation"
import MainLayout from "./components/layout/main-layout"

export default function HomePage() {
  return (
    <Providers>
      <IntroAnimation />
      <MainLayout />
    </Providers>
  )
}
