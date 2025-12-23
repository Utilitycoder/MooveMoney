# Transaction Flow UX Requirements
## AI-Powered Crypto Wallet - Send Transaction Flow

**Scenario:** User says "Send 10 MOVE to Alice"

---

## <AIChat />

**Purpose:**
Capture the user's transaction intent through natural conversation. Confirm understanding before proceeding to review.

**Entry Condition:**
- User opens the chat interface
- User has an active wallet connection
- User initiates conversation (voice or text input)

**Visible Content:**

*Headline:*
- None (chat interface is conversational, not screen-based)

*Primary Information:*
- User's message: "Send 10 MOVE to Alice"
- AI response confirming understanding:
  - "I'll send 10 MOVE to Alice. Let me prepare the transaction for your review."
- Chat history showing the conversation context

*Secondary/Supporting Information:*
- Typing indicator while AI processes
- Timestamp for each message
- Visual distinction between user and AI messages

*Primary Action:*
- "Review Transaction" button appears after AI confirms intent
- Button label: "Review Transaction"
- User believes: "I'll see the details before anything happens"

*Secondary Action:*
- "Cancel" or "Edit" option if AI misunderstood
- User can clarify or change the request

**Trust Signals:**
- AI clearly restates what it understood
- No transaction is created until user taps "Review Transaction"
- User can see their exact words preserved
- Calm, conversational tone (not robotic)

**UX Constraints:**
- NO transaction details shown here (amount, fees, addresses)
- NO signing prompts
- NO technical jargon (no "transaction hash", "gas fees", "nonce")
- NO irreversible actions
- Must allow user to correct misunderstandings before proceeding

---

## <TransactionReview />

**Purpose:**
Present all transaction details clearly. Give user final chance to verify everything before committing. This is the critical decision point.

**Entry Condition:**
- User confirmed intent in AIChat
- Backend has built the transaction
- All transaction parameters are available (amount, recipient, fees, network)

**Visible Content:**

*Headline:*
- "Review Transaction" (centered, clear)

*Primary Information:*
- **Amount:** "10 MOVE" (large, prominent)
- **To:** "Alice" (contact name, with avatar if available)
  - Secondary line: "alice.movement" (address in smaller text, truncated with middle ellipsis)
- **Network:** "Movement Testnet" (subtle badge or text)
- **Estimated Fee:** "~0.001 MOVE" (small, below amount)

*Secondary/Supporting Information:*
- Transaction summary card with:
  - Total amount (amount + fee)
  - Estimated completion time: "Usually completes in a few seconds"
- Visual separator between amount and recipient
- Network indicator (subtle, non-alarming)

*Primary Action:*
- Button label: "Confirm & Sign"
- Button style: Primary, full-width, at bottom
- User believes: "I'm approving this exact transaction. Next step is signing."

*Secondary Action:*
- "Cancel" button (text, not prominent)
- "Edit" option (if supported) to go back and modify
- Back gesture/swipe to dismiss

**Trust Signals:**
- All critical information visible at once (no scrolling required for key details)
- Contact name + address both shown (verification)
- Clear visual hierarchy (amount is most prominent)
- "Review Transaction" headline reinforces this is a checkpoint
- Network clearly labeled (prevents confusion about which network)
- Fee is transparent and visible
- No hidden information

**UX Constraints:**
- NO signing interface here (that's next step)
- NO technical transaction data (raw hex, nonce, etc.)
- NO loading spinners (transaction is already built)
- NO irreversible actions yet
- NO confusing terminology
- Must be dismissible/cancellable
- Must show total cost (amount + fees) clearly

---

## <PrivySignModal />

**Purpose:**
Final consent step. User signs the transaction. This is the point of no return. Must feel intentional and secure.

**Entry Condition:**
- User tapped "Confirm & Sign" on TransactionReview
- Transaction is ready to be signed
- Privy SDK is initialized and ready

**Visible Content:**

*Headline:*
- "Sign Transaction" (clear, centered)

*Primary Information:*
- Brief reminder: "Sending 10 MOVE to Alice"
- Privy's native signing interface (wallet connection, biometric prompt, etc.)
- Security indicator: "This action cannot be undone"

*Secondary/Supporting Information:*
- Small text: "You're signing this transaction with your wallet"
- Network indicator remains visible
- Transaction summary (collapsed/minimal): "10 MOVE → Alice"

*Primary Action:*
- Privy's native "Sign" button (handled by Privy SDK)
- User believes: "I'm giving final approval. After this, the transaction will be sent."

*Secondary Action:**
- "Cancel" option (if Privy allows, before signing)
- Back button disabled once signing process starts
- After signing: No cancel option (transaction is committed)

**Trust Signals:**
- Clear "Sign Transaction" headline
- Reminder of what they're signing
- Security messaging: "This action cannot be undone"
- Privy's trusted UI (users recognize wallet signing flows)
- Biometric/security prompt feels secure
- No rush or pressure

**UX Constraints:**
- NO ability to cancel after signing begins
- NO transaction details editing (too late)
- NO confusing technical prompts
- NO multiple signing steps (should be one clear action)
- Must use Privy's native UI (don't override their security UX)
- Must clearly indicate this is the final step
- NO ability to go back and change transaction after this point

---

## <TransactionProcessing />

**Purpose:**
Show progress while transaction is being submitted and confirmed. Keep user informed without technical jargon. Manage anxiety during wait time.

**Entry Condition:**
- User has signed the transaction
- Transaction is being submitted to network
- Backend is processing and waiting for confirmation

**Visible Content:**

*Headline:*
- "Processing Transaction" (or "Sending...")

*Primary Information:**
- Animated progress indicator (spinner or progress bar)
- Status message that updates:
  - "Submitting transaction..."
  - "Waiting for confirmation..."
  - "Almost done..."
- Amount reminder: "10 MOVE to Alice" (small, below status)

*Secondary/Supporting Information:**
- Estimated time: "This usually takes a few seconds"
- Network indicator: "Movement Testnet"
- Visual feedback (subtle animation, not distracting)

*Primary Action:**
- None (processing is automatic)
- User cannot cancel at this stage

*Secondary Action:**
- None (transaction is in flight)

**Trust Signals:**
- Clear status messages in human language
- Progress indicator shows something is happening
- Reassuring time estimate
- Reminder of what's being sent (reduces anxiety)
- Calm, steady animation (not frantic)
- No error state yet (optimistic)

**UX Constraints:**
- NO technical status codes or error messages (unless actual error occurs)
- NO ability to cancel (transaction is submitted)
- NO confusing blockchain terminology
- NO raw transaction hashes or block numbers
- Must explain progress in plain language
- Must not feel like it's stuck (show clear progress)
- NO ability to navigate away (or show warning if they try)

---

## <TransactionResult />

**Purpose:**
Confirm transaction outcome. Celebrate success or explain failure clearly. Provide next steps.

**Entry Condition:**
- Transaction has been confirmed or failed
- Network response is received
- User needs to know the outcome

**Visible Content:**

### Success State:

*Headline:*
- "Transaction Sent" (with checkmark icon)

*Primary Information:**
- Success message: "10 MOVE sent to Alice"
- Confirmation details:
  - "Completed in ~3 seconds"
  - Transaction ID (truncated, tappable to view full)
- Visual: Success icon (checkmark, green)

*Secondary/Supporting Information:**
- "View on Explorer" link (optional, for power users)
- "Alice received your payment" (reassuring)
- Network: "Movement Testnet"

*Primary Action:**
- Button label: "Done"
- User believes: "I'll return to the main screen"

*Secondary Action:**
- "View Details" (optional, shows full transaction info)
- "Send Another" (quick action)

**Trust Signals:**
- Clear success confirmation
- Specific amount and recipient restated
- Completion time shown (validates it worked)
- Transaction ID available (for verification if needed)
- Positive, reassuring tone

### Failure State:

*Headline:*
- "Transaction Failed" (with alert icon)

*Primary Information:**
- Clear explanation in human language:
  - "The transaction couldn't be completed"
  - Specific reason if available: "Insufficient funds" or "Network error"
- What was attempted: "10 MOVE to Alice"

*Secondary/Supporting Information:**
- "Your funds are safe" (reassurance)
- "You can try again" (next step)
- Error code (if needed for support, but de-emphasized)

*Primary Action:**
- Button label: "Try Again"
- User believes: "I'll retry the same transaction"

*Secondary Action:**
- "Go Back" (return to review screen)
- "Contact Support" (if error is unclear)

**Trust Signals:**
- Clear explanation (not technical jargon)
- Reassurance that funds are safe
- Actionable next steps
- No blame or confusion
- Calm, helpful tone

**UX Constraints:**
- NO technical error codes as primary message
- NO blockchain jargon unless absolutely necessary
- NO confusing mixed messages
- Must clearly distinguish success vs. failure
- Must provide clear next steps
- NO ability to undo (transaction is complete or failed)
- Must reassure user about fund safety in failure case
- Success state should feel positive but not overly celebratory (calm confidence)

---

## Flow Summary

**User Journey:**
1. **AIChat** → User expresses intent, AI confirms
2. **TransactionReview** → User reviews details, decides to proceed
3. **PrivySignModal** → User gives final consent via signature
4. **TransactionProcessing** → System submits and confirms
5. **TransactionResult** → User sees outcome and next steps

**Key Principles:**
- Each step has a single, clear purpose
- User can cancel until signing
- After signing, user is informed but cannot cancel
- All messaging is human, calm, and clear
- Technical details are hidden unless necessary
- Trust is built through clarity and transparency
- User never feels rushed or confused

**Design Goal Achieved:**
User feels: "I understood what was happening, I approved it intentionally, and I was never confused or rushed."

