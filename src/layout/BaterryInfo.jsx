import { useEffect, useState } from 'react';
import Main from "../layout/Main";
const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

  useEffect(() => {
    navigator.getBattery().then((battery) => {
      const updateBatteryStatus = () => {
        setBatteryLevel(battery.level);
        setIsCharging(battery.charging);
      };

      updateBatteryStatus();
      battery.addEventListener('levelchange', updateBatteryStatus);
      battery.addEventListener('chargingchange', updateBatteryStatus);

      return () => {
        battery.removeEventListener('levelchange', updateBatteryStatus);
        battery.removeEventListener('chargingchange', updateBatteryStatus);
      };
    });
  }, []);

  return (
    <Main>
    <div className="container mx-auto mt-12">
      <div className="text-3xl font-semibold">Battery Status</div>
      {batteryLevel !== null && (
        <>
          <div>Battery level: {batteryLevel * 100}%</div>
          <div>Charging: {isCharging ? 'Yes' : 'No'}</div>
          <div className="w-24 h-12 bg-gray-200 border-2 border-gray-400 relative">
            <div className={`h-full flex justify-center items-center bg-green-600 w-[${batteryLevel * 100}%]`}></div>
          </div>
        </>
      )}
    </div>
    </Main>
  );
};

export default BatteryStatus;
