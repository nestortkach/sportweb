import style from "./PreSelectedService.module.scss";
export const PreSelectedService = ({ preselectedService }) => {
  return (
    <div className={style.service}>
      <div className={style.service__info}>
        <div className={style.info__name}>{preselectedService.Name}</div>
        <div className={style.info__type}>
          {preselectedService.ServiceTypeName}
        </div>
        <div className={style.info__details}>
          <div>{preselectedService.SellInclusive} AED</div>
          <div>{preselectedService.Duration} minutes</div>
        </div>
      </div>
    </div>
  );
};
