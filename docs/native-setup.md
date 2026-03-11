# Native Setup
1. Install RN deps: `yarn install`.
2. iOS: `cd ios && pod install`.
3. Link SQLite and Vision Camera per package docs.
4. OCR: integrate Google ML Kit text recognition native SDK in Android/iOS and wire into `runVisitingCardOcr`.
5. Enable file sharing permissions for export/backup.
