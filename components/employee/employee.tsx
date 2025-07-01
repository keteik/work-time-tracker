'use client';

import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';

type EmployeeStatus = 'active' | 'inactive' | 'on_leave';

interface EmployeeStatusItemProps {
  status: EmployeeStatus;
}

function EmployeeStatusItem(props: EmployeeStatusItemProps) {
  const [date, setDate] = useState(
    dayjs()
      .set('minutes', 0)
      .set('hours', 0)
      .set('seconds', dayjs().diff('2025-07-01T12:00', 'seconds')),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        dayjs()
          .set('minutes', 0)
          .set('hours', 0)
          .set('seconds', dayjs().diff('2025-07-01T12:00', 'seconds')),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (props.status === 'active') {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="font-sans">Total today: {date.format('HH:mm:ss')}</p>
        <div className="flex flex-row items-center justify-center gap-5">
          <Button className="cursor-pointer bg-amber-500 font-sans">
            Go on pause
          </Button>
          <Button className="cursor-pointer bg-red-500 font-sans">Leave</Button>
        </div>
      </div>
    );
  } else if (props.status === 'inactive') {
    return <p className="text-red-500">Inactive</p>;
  } else if (props.status === 'on_leave') {
    return <p className="text-yellow-500">On Leave</p>;
  }
  return <p className="text-gray-500">Unknown</p>;
}

export default function Employee({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [employeeStatus, setEmployeeStatus] =
    useState<EmployeeStatus>('active');

  const handleEmployeeStatus = (status: EmployeeStatus) => {
    setEmployeeStatus(status);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-7 p-6',
        className,
      )}
      {...props}
    >
      <title>Employee</title>
      <p className="font-sans text-2xl">Hello, {'Jan Kowalski'} !</p>
      <div className="flex h-30 flex-row items-center justify-center rounded-3xl bg-gray-50 p-10 shadow-2xl">
        <EmployeeStatusItem status={employeeStatus}></EmployeeStatusItem>
      </div>
    </div>
  );
}
