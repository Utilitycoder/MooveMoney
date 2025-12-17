import HomePage from "@/Components/HomePage";
import { usePrivy } from "@privy-io/expo";
import RootNav from "./(app)/_layout";

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

    !user ? <RootNav /> : <HomePage />
  );
}
