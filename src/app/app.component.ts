import { Component } from '@angular/core';

@Component({
  selector: 'dr11-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public selectedRate: number;
	public selectedVoice: SpeechSynthesisVoice | null;
	public text: string;
	public voices: SpeechSynthesisVoice[];

	// I initialize the app component.
	constructor() {

		this.voices = [];
		this.selectedVoice = null;
		this.selectedRate = 1;
    this.text = "Lautaro Martinez inter 100 crediti  offerti da Fabio ";
	}

	// ---
	// PUBLIC METHODS.
	// ---
	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.voices = speechSynthesis.getVoices();
		this.selectedVoice = ( this.voices[ 0 ] || null );
	}


	// I synthesize speech from the current text for the currently-selected voice.
	public speak() : void {

		// if ( ! this.selectedVoice || ! this.text ) {

		// 	return;

		// }

    this.voices = speechSynthesis.getVoices();
    this.selectedVoice = this.voices[1];

		this.stop();
		this.synthesizeSpeechFromText( this.selectedVoice, this.selectedRate, this.text );

	}
	// I stop any current speech synthesis.
	public stop() : void {

		if ( speechSynthesis.speaking ) {
			speechSynthesis.cancel();
		}
  }

	// ---
	// PRIVATE METHODS.
	// ---
	// I perform the low-level speech synthesis for the given voice, rate, and text.
	private synthesizeSpeechFromText(
		voice: SpeechSynthesisVoice,
		rate: number,
		text: string
		) : void {

		const utterance = new SpeechSynthesisUtterance( text );
		utterance.voice = this.selectedVoice;
    utterance.rate = rate;

		speechSynthesis.speak( utterance );
	}
}
