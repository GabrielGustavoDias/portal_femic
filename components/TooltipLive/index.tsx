
interface Live {
  link: string;
  hour: string;
  day: string;
}

interface IProps {
  live: Live;
}

export default function TooltipLive({ live }: IProps) {

  const renderDate = (data: string) => {
		const date = new Date(data);
		date.setDate(date.getDate() + 1);
		return date.toLocaleDateString();
	};

  return (
    <div className='flex flex-col'>
      <label htmlFor="" className='text-bold text-xl text-white'>Dia</label>  
      <span className='text-white'>{renderDate(live.day)}</span>
      <label htmlFor="" className='text-bold text-xl text-white'>Hora</label>
      <span className='text-white'>{live.hour}</span>
    </div>
  );
}

