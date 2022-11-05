import axiosClient from "./axiosClient";

class MemberApi {
  // get last View
  getAllLastView() {
    let url = `conversation/6354b2fb72627b4fe7950fa3/last-view`;
    return axiosClient.get(url);
  }

  // get all members
  // load All members of conver
  getAllMembers(converId) {
    let url = `conversation/${converId}/members`;
    return axiosClient.get(url);
  }
}

const memberApi = new MemberApi();
export default memberApi;
