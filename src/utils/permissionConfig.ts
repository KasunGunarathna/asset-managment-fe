import { UserType } from "../types/enum";

export const CheckPermission = (permission: any, type: any) => {
  switch (type) {
    case "bulk":
    case "add":
    case "edit":
      if (permission === UserType.Admin || permission === UserType.Collector)
        return true;
      if (permission === UserType.Viewer) return false;
      break;
    case "delete":
      if (permission === UserType.Admin) return true;
      if (permission === UserType.Collector || permission === UserType.Viewer)
        return false;
      break;
    case "view":
      return true;
    case "page":
      if (permission === UserType.Admin) return true;
      else return false;
    default:
      break;
  }
};
