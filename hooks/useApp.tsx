import { useSelector } from "react-redux";
import { AppStore } from "redux/store";

function useApp() {
    return useSelector((state: AppStore) => state.app);
}
export default useApp