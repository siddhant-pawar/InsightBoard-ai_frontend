import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Brain, Upload, FileText, Loader2 } from 'lucide-react';

interface TranscriptProcessorProps {
  onProcessTranscript: (transcript: string) => Promise<void>;
  loading: boolean;
}

export function TranscriptProcessor({ onProcessTranscript, loading }: TranscriptProcessorProps) {
  const [transcript, setTranscript] = useState('');
  const maxLength = 10000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      await onProcessTranscript(transcript.trim());
      setTranscript('');
    }
  };

  const placeholderText = `Paste your meeting transcript here...

Example:
"In today's meeting, we discussed the upcoming product launch. John will handle the marketing campaign by next Friday. Sarah needs to finalize the product documentation by Wednesday. We also need to schedule a follow-up meeting with the design team for next week to review the UI mockups. Mike mentioned we should update the pricing page on the website before the launch."`;

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Brain className="h-6 w-6 text-purple-600" />
          AI Transcript Processor
        </CardTitle>
        <p className="text-gray-600">
          Transform meeting notes into actionable tasks with our AI-powered analysis
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transcript" className="text-sm font-medium text-gray-700">
              Meeting Transcript
            </Label>
            <Textarea
              id="transcript"
              placeholder={placeholderText}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[200px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={maxLength}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Tip: Include action items, deadlines, and responsibilities for best results
              </p>
              <span className={`text-xs ${
                transcript.length > maxLength * 0.9 ? 'text-amber-600' : 'text-gray-500'
              }`}>
                {transcript.length}/{maxLength}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!transcript.trim() || loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Tasks
                </>
              )}
            </Button>
            
            <Button variant="outline" type="button" disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <FileText className="h-4 w-4 text-gray-400" />
            <span>Supports meeting transcripts, notes, and action item lists</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}