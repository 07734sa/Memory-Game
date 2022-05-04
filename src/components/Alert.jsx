import './Alert.css'
import '../App.css'

function Alert({ children }) {



  return (
    <div className="alert-backdrop">
        <div className='alert'>
            {children}
        </div>
    </div>
  )
}

export default Alert