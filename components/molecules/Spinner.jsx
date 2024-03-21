import style from './Spinner.module.scss'
export const Spinner = () => {
  return (
    <div className={style.spinnerContainer}>
    <div className={style.spinner}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
