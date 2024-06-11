"use client"

import {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [slots, setSlots] = useState<number>(15);

  const [slotType, setSlotType] = useState<number>(0);

  const [tier, setTeir] = useState<string>('');

  const [space, setSpace] = useState<any>({});

  const [hours, setHours] = useState<number>(0);

  const [cost, setCost] = useState<number>(0);

  const [bookings, setBookings] = useState<any>([]);

  const cal = (e:any) => {
    e.preventDefault();
    setHours(e.target.value);

    if(slotType === 1) {
      let amount = tier === 'basic' ? 10 : tier === 'premium' ? 15 : tier === 'executive' ? 20 : 0;
      let cycle = e.target.value;
      const sum = cycle < 3 ? (amount * e.target.value) : ((amount * e.target.value) / 10);
      setCost(sum)
    } else if (slotType === 2) {
      let amount = 25;
      let cycle = e.target.value;
      const sum = cycle < 3 ? (amount * e.target.value) : ((amount * e.target.value) / 10);
      setCost(sum);
    }

  }

  const save = () => {
    if(slots > 0) {
      let arr:any = [];
      // if (typeof window !== "undefined") {
      //   arr = localStorage.getItem('bookings') || [];
      // }
     
      let data = {
        tier: `Booked tier ${tier}.`,
        hour: `Booked session ${hours} hours.`,
        cost: `Total cost ${cost} USD`
      };
  
      arr.push(data);

      setBookings(arr);
  
      // localStorage.setItem('bookings', JSON.stringify(arr));
  
      toast.success("Great your slot has been booked")
  
      setSlots( slots - 1)
      setSlotType(0)
      setTeir('')
      setHours(0)
      setCost(0)
    } else {
      toast.success("Sorry no slots available, check later.")
    }
  }

  // useEffect(() => {
  //   let arr:any = localStorage.getItem('bookings') || [];
  //   // arr = JSON.parse(arr)
  //   console.log(arr)
  //   if(arr.length > 0) {
  //     setSlots(15 - arr.length);
  //   }
  // }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <ToastContainer />
      <h1
        className='text-center text-white font-bold text-2xl mb-10'
      >
        Welcome To Book A Work space, we have {slots} slots available
      </h1>

      <div
        className='w-10/12 mb-10'
      >

        <p
          className='text-white font-semibold text-lg mb-10'
        >
          Which teir would you like ?
        </p>
        
       <div
        className='w-9/12 flex lg:flex-row flex-col items-center justify-between'
       >
          <div
            className={`border-2 ${slotType === 1 ? 'border-green-300' : ''} rounded-lg p-4 cursor-pointer`}
            onClick={() => setSlotType(1)}
          >
            <p
              className='text-medium'
            >
              Individual Work Space
            </p>
          </div>

          <div
            className={`border-2 ${slotType === 2 ? 'border-green-300' : ''} rounded-lg p-4 cursor-pointer`}
            onClick={() => setSlotType(2)}
          >
            <p
              className='text-medium'
            >
            Team Work Space
            </p>
          </div>
       </div>

      </div>

      {
        slotType !== 0 && (
          <div
            className='w-10/12 mb-10'
          >
            <p
              className='text-medium mb-10'
            >
              Great you selected {slotType === 1 ? 'single work space' : "team work space"}.
            </p>

            {
              slotType === 1 ? (
                <div
                className='w-9/12 flex lg:flex-row flex-col items-center justify-between'
               >
                  <div
                    className={`border-2 ${tier === 'basic' ? 'border-green-300' : ''} rounded-lg p-4 cursor-pointer`}
                    onClick={() => setTeir('basic')}
                  >
                    <p
                      className='text-medium'
                    >
                      Basic
                    </p>
                  </div>

                  <div
                    className={`border-2 ${tier === 'premium' ? 'border-green-300' : ''} rounded-lg p-4 cursor-pointer`}
                    onClick={() => setTeir('premium')}
                  >
                    <p
                      className='text-medium'
                    >
                      Premium
                    </p>
                  </div>
        
                  <div
                    className={`border-2 ${tier === 'executive' ? 'border-green-300' : ''} rounded-lg p-4 cursor-pointer`}
                    onClick={() => setTeir('executive')}
                  >
                    <p
                      className='text-medium'
                    >
                    Executive
                    </p>
                  </div>
               </div>
              ) 
              : slotType === 2 ? (
                <div
                className='w-9/12'
               >
                <p
                  className='text-medium mb-10'
                >
                  Save your slot we charge of $25 per hour.
                </p>

                <div>
                  <div className='mb-4'>
                    <label>How many hours ?</label>
                    <input type={'number'} max={24} className='ml-4 text-black' onChange={(e:any) => cal(e)} />
                  </div>

                  <div className='mb-4'>
                    <p>It would cost you {cost}</p>
                    {hours > 3 && (<p>Great you got a 10% discount</p>)}
                  </div>

                  <button onClick={save}>
                    Save
                  </button>
                </div>
               </div>
              ) : null
            }
          </div>
        )
      }

      {
        (tier !== '' && slotType === 1) && (
          <div
            className='w-10/12'
          >
            <p
              className='text-medium mb-10'
            >
              Save your slot, we charge ${tier === 'basic' ? 10 : tier === 'premium' ? 15 : tier === 'executive' ? 20 : 0} per hour.
            </p>

            <div>
              <div className='mb-4'>
                <label>How many hours ?</label>
                <input type={'number'} max={24} className='ml-4 text-black' onChange={(e:any) => cal(e)} />
              </div>

              <div className='mb-4'>
                <p>It would cost you {cost}.</p>

                {hours > 3 && (<p>Great you got a 10% discount</p>)}
              </div>

              <button onClick={save}>
                Save
              </button>
            </div>
          </div>
        )
      }

    </main>
  );
}
