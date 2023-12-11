import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProps {
  title: string;
  dateIni: string;
  dateFim?: string;
  totalActivities: any[];
  avaCompleted: boolean;
}

function ProgressGraf({
  totalActivities,
  avaCompleted,
}: {
  totalActivities: any[];
  avaCompleted: boolean;
}) {
  let completedCount = 0;

  totalActivities?.forEach((act) => {
    if (act.concluido) {
      completedCount++;
    }
  });

  if (avaCompleted) {
    completedCount++;
  }

  const totalItems = totalActivities?.length + 1;
  const progress = Math.round((completedCount / totalItems) * 100 || 0);

  return (
    <div style={{ width: '100px', height: '100px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          strokeLinecap: 'butt',
          pathTransitionDuration: 0.5,
          pathColor: '#1FB58F',
          textColor: '#1FB58F',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
}

export default function InfoHeader({
  title,
  dateIni,
  dateFim,
  totalActivities,
  avaCompleted,
}: IProps) {
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
