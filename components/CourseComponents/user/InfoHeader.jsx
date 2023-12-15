import { ProgressGraf } from '../ProgressCourse/ProgressCourse';

// interface IProps {
//   title: string;
//   dateIni: string;
//   dateFim?: string;
//   totalActivities: any[];
//   avaCompleted: boolean;
// }
export default function InfoHeader({
  title,
  dateIni,
  dateFim,
  totalActivities,
  avaCompleted,
}) {
  return (
    <div className="flex rounded bg-white shadow-md p-8 mx-3 items-center justify-between">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl">{title}</h1>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span>Data de Inicio</span>
            <span className="text-sm text-slate-500">
              {new Date(dateIni).toLocaleDateString()}
            </span>
          </div>
          {dateFim && (
            <div className="flex flex-col">
              <span>Data de Termino</span>
              <span className="text-sm text-slate-500">
                {new Date(dateFim).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="flex mx-auto items-center justify-center p-3">
          <span className="text-2xl font-bold text-white capitalize">
            <ProgressGraf
              totalActivities={totalActivities}
              avaCompleted={avaCompleted}
            />
          </span>
        </div>
        <span className="text-center">Progresso no curso</span>
      </div>
    </div>
  );
}
