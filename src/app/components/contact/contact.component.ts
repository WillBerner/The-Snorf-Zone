import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as emailjs from '@emailjs/browser';

@Component({
  standalone: true,
  selector: 'contact-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });
  sending = false;
  feedback: 'success' | 'error' | '' = '';

  async sendMessage() {
    if (this.contactForm.invalid) {
      return;
    }

    this.sending = true;
    this.feedback = '';

    try {
      await emailjs.send(
        'service_t41wuua',
        'template_zg25jo7',
        {
          from_name: this.contactForm.value.name,
          reply_to: this.contactForm.value.email,
          message: `New message from ${this.contactForm.value.name} at ${this.contactForm.value.email}: ${this.contactForm.value.message}`
        },
        'mhYYK-GTia4KMXKPZ',
      );
      this.feedback = 'success';
      this.contactForm.reset();
    } catch (error) {
      console.error(error);
      this.feedback = 'error';
    } finally {
      this.sending = false;
    }
  }
}
