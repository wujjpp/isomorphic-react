/*
 * Created by Wu Jian Ping on 2019/03/18
 */

import Loadable from "react-loadable";
import Loading from "./Loading";

export default ({ loader, loading = Loading }) => Loadable({ loader, loading });
