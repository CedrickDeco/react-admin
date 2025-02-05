import { BulkDeleteButton } from "react-admin";
import BulkDisableButton from "./BulkDisableButton";
import BulkEnableButton from "./BulkEnableButton";

const BulkActionButtons = () => {
    return (
        <>
          <BulkDisableButton /> {/* ✅ Pas besoin de props, il récupère `selectedIds` via `useListContext()` */}
          <BulkEnableButton />
        </>
    );
};

export default BulkActionButtons;

