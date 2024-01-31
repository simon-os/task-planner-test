export default function Spinner() {
  // https://loading.io/css/
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
