import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function ProgressGraf({ totalActivities, avaCompleted }) {
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
