import HomePage from "@/Components/HomePage";
import LoginPage from "@/Components/LoginPage";
import { usePrivy } from "@privy-io/expo";

export default function Index() {
  const { user } = usePrivy();
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   return
    // </View>

    !user ? <LoginPage /> : <HomePage />
  );
}
