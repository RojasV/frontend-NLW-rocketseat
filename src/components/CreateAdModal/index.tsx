import { useState, useEffect, FormEvent } from 'react'
import { Check, GameController } from 'phosphor-react'
import { Input } from '../Form'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { GameProps } from '../../App'
import axios from 'axios'


export function CreateAdModal() {

    const [weekDays, setWeekDays] = useState<string[]>([])
    const [games, setGames] = useState<GameProps[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)


    console.log(weekDays)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        console.log(data.game)

        if (!data.name) {
           return 
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('anúncio criado com sucesso')
        } catch (err) {
            console.error(err)
            alert('erro ao criar o anúncio')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                <Dialog.Title className='text-3xl text-white font-black'>
                    Publique um anúncio
                </Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4' action="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className='font-semibold'>Qual o Game?</label>
                        <select
                            name='game'
                            id='game'
                            placeholder='Selecione o game que deseja jogar'
                            className='bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500 appearance-none'
                            defaultValue=""
                        >
                            <option disabled value="">Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Seu nome (ou nickname)</label>
                        <Input name='name' id='name' type="text" placeholder='Como te chamam dentro do game?' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                        <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name='discord' id='discord' type="text" placeholder='Usuario#0000' />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Quando costuma jogar?</label>
                            <ToggleGroup.Root onValueChange={setWeekDays} value={weekDays} className='flex gap-3' type='multiple'>
                                <ToggleGroup.Item value='0' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : ''}`} title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item value='1' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : ''}`} title='Segunda'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value='2' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : ''}`} title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item value='3' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : ''}`} title='Quarta'>Q</ToggleGroup.Item>
                            </ToggleGroup.Root>

                            <ToggleGroup.Root onValueChange={setWeekDays} value={weekDays} className='flex gap-3' type='multiple'>
                                <ToggleGroup.Item value='4' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : ''}`} title='Quinta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item value='5' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : ''}`} title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value='6' className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : ''}`} title='Sábado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="discord">Qual horário do dia você costuma jogar?</label>
                            <div className="grid grid-cols-2 gap-1">
                                <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                                <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>
                    <label className="flex flex-row items-center gap-2 text-sm mt-2">
                        <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                            if (checked === true) {
                                setUseVoiceChannel(true)
                            } else {
                                setUseVoiceChannel(false)
                            }
                        }} className='w-6 h-6 rounded bg-zinc-900'>
                            <Checkbox.Indicator className='flex items-center justify-center'>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.DialogClose type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.DialogClose>
                        <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600' type='submit'>
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}