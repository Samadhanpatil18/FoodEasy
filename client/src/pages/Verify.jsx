import { useContext, useEffect } from "react"
import { StoreContext } from "../context/StoredContextProvider"
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../constants/Loading";
import axios from "axios";

function Verify() {

  const { backendUrl } = useContext(StoreContext);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(backendUrl + '/api/order/verify', {success,orderId});
    if(response.data.success){
      navigate('/myorders');
    }
    else{
      alert('Session Failed!');
      navigate('/');
    }
  }

  useEffect(() => {
    verifyPayment();
  },[])

  return (
    <div className="screen-max-width">
      <Loading />
    </div>
  )
}

export default Verify