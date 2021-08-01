import  './styles.css'
export const Button = ({onClick, text, disabled}) => {

    return(
        <button
          className="button"
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
    );
}