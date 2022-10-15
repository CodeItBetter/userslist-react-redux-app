import classes from './Button.module.css';

const Button = ({children,btnType, ...props}) =>{
    return <button className={classes.btn} 
    {...props}>{children}</button>
}

export default Button;