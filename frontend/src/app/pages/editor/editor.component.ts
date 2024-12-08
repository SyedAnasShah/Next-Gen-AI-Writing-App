import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AiService } from '../../ai.service';
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public mainForm!: FormGroup; // Fixed definite assignment
  public grammarSuggestions: string | null = null;
  public contentRecommendations: string | null = null;

  constructor(
    private fb: FormBuilder,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  checkGrammar(): void {
    const bodyText = this.mainForm.get('body')?.value || '';
    if (!bodyText.trim()) {
      this.grammarSuggestions = 'Please write something in the article body to check grammar.';
      return;
    }

    this.aiService.checkGrammar(bodyText).subscribe({
      next: (response) => {
        this.grammarSuggestions = response.correctedText || 'No suggestions found.';
      },
      error: (err) => {
        console.error('Error checking grammar:', err);
        this.grammarSuggestions = 'An error occurred while checking grammar.';
      }
    });
  }

  recommendContent(): void {
    const descriptionText = this.mainForm.get('description')?.value || '';
    if (!descriptionText.trim()) {
      this.contentRecommendations = 'Please provide a description to get recommendations.';
      return;
    }

    this.aiService.recommendContent(descriptionText).subscribe({
      next: (response) => {
        this.contentRecommendations = response.recommendations?.join(', ') || 'No recommendations available.';
      },
      error: (err) => {
        console.error('Error getting recommendations:', err);
        this.contentRecommendations = 'An error occurred while fetching recommendations.';
      }
    });
  }

  submitForm(): void {
    if (this.mainForm.valid) {
      const articleData = this.mainForm.value;
      console.log('Publishing article:', articleData);
    }
  }
}
