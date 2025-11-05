import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Cakranesia",
  description:
    "Privacy Policy for Cakranesia - Learn how we collect, use, and protect your personal information",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground mt-2">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Quick Summary */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Your Privacy Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              • We collect only essential information to provide our service
            </p>
            <p>
              • Your data is stored securely and never sold to third parties
            </p>
            <p>• You have full control over your personal information</p>
            <p>• We use cookies to improve your experience</p>
            <p>• You can delete your account and data at any time</p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              1. Introduction
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to{" "}
                <strong className="text-foreground">Cakranesia</strong>. We are
                committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your data when you use
                our platform.
              </p>
              <p>
                Cakranesia is a community platform dedicated to preserving
                Indonesian culinary heritage (&quot;Melestarikan Cita Rasa
                Indonesia&quot;). We provide a space for food enthusiasts to
                discover recipes, share stories, and connect with others who
                appreciate Indonesian cuisine.
              </p>
              <p>
                By using Cakranesia, you consent to the data practices described
                in this policy. If you do not agree with this policy, please do
                not use our service.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                2.1 Information You Provide
              </h3>
              <p>When you create an account and use Cakranesia, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Account Information:
                  </strong>{" "}
                  Name, email address, password (encrypted)
                </li>
                <li>
                  <strong className="text-foreground">
                    Profile Information:
                  </strong>{" "}
                  Optional profile picture, bio, location
                </li>
                <li>
                  <strong className="text-foreground">User Content:</strong>{" "}
                  Recipes, blog posts, comments, photos, and other content you
                  create or upload
                </li>
                <li>
                  <strong className="text-foreground">Interactions:</strong>{" "}
                  Likes, saves, follows, and other engagement activities
                </li>
                <li>
                  <strong className="text-foreground">Communications:</strong>{" "}
                  Messages sent to support or other users (if applicable)
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                2.2 Information Collected Automatically
              </h3>
              <p>When you use our service, we automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Device Information:
                  </strong>{" "}
                  Device type, operating system, browser type and version
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong> Pages
                  visited, time spent, click patterns, search queries
                </li>
                <li>
                  <strong className="text-foreground">IP Address:</strong> Your
                  IP address for security and analytics purposes
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> Small
                  data files stored on your device (see section 6)
                </li>
                <li>
                  <strong className="text-foreground">Analytics Data:</strong>{" "}
                  Information about how you interact with our platform
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                2.3 Information from Third Parties
              </h3>
              <p>If you sign up using Google OAuth, we receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address from your Google account</li>
                <li>Profile picture (if public)</li>
                <li>We do not receive your Google password</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use the information we collect to:</p>

              <h3 className="text-lg font-semibold text-foreground">
                3.1 Provide and Improve Our Service
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account</li>
                <li>Enable you to post recipes, blogs, and comments</li>
                <li>Provide personalized recipe recommendations</li>
                <li>Power our AI chatbot for food suggestions</li>
                <li>
                  Enable search and discovery features by province and
                  ingredients
                </li>
                <li>Improve our platform based on usage patterns</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.2 Communication
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send verification emails for account security</li>
                <li>Send password reset links when requested</li>
                <li>Notify you about important account or service updates</li>
                <li>Respond to your support inquiries</li>
                <li>
                  Send notifications about interactions (likes, comments) if
                  enabled
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.3 Security and Legal Compliance
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Protect against fraud, abuse, and security threats</li>
                <li>Enforce our Terms of Service</li>
                <li>Comply with legal obligations and requests</li>
                <li>Monitor and moderate content for community safety</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.4 Analytics and Improvement
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analyze usage trends and user preferences</li>
                <li>Test new features and improvements</li>
                <li>Understand which recipes and content are most popular</li>
                <li>Optimize platform performance</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. How We Share Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We <strong className="text-foreground">do not sell</strong> your
                personal information to third parties. We only share your
                information in the following circumstances:
              </p>

              <h3 className="text-lg font-semibold text-foreground">
                4.1 Public Information
              </h3>
              <p>
                The following information is visible to other Cakranesia users:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your display name and profile picture</li>
                <li>Recipes, blog posts, and comments you publish</li>
                <li>
                  Your likes, saves, and follows (depending on your settings)
                </li>
                <li>Your activity feed (if you choose to make it public)</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                4.2 Service Providers
              </h3>
              <p>
                We share data with trusted third-party service providers who
                help us operate:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Hosting:</strong> Our
                  platform is hosted on secure cloud infrastructure
                </li>
                <li>
                  <strong className="text-foreground">Database:</strong>{" "}
                  PostgreSQL for data storage (Drizzle ORM)
                </li>
                <li>
                  <strong className="text-foreground">Authentication:</strong>{" "}
                  Better-auth for secure login and session management
                </li>
                <li>
                  <strong className="text-foreground">Email:</strong> Email
                  service providers for verification and notifications
                  (Nodemailer)
                </li>
                <li>
                  <strong className="text-foreground">Analytics:</strong> Google
                  Analytics or Umami for usage statistics
                </li>
                <li>
                  <strong className="text-foreground">AI Services:</strong>{" "}
                  Third-party AI providers for chatbot functionality
                </li>
              </ul>
              <p>
                These providers are contractually obligated to protect your data
                and use it only for the services they provide to us.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                4.3 Legal Requirements
              </h3>
              <p>
                We may disclose your information if required by law or in
                response to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Legal processes (subpoenas, court orders)</li>
                <li>Law enforcement requests</li>
                <li>Protection of our rights, property, or safety</li>
                <li>Protection of users or the public</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                4.4 Business Transfers
              </h3>
              <p>
                If Cakranesia is involved in a merger, acquisition, or sale of
                assets, your information may be transferred. We will notify you
                of any such change.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              5. Data Security
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement industry-standard security measures to protect your
                personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Encryption:</strong>{" "}
                  Passwords are hashed using secure algorithms
                </li>
                <li>
                  <strong className="text-foreground">HTTPS:</strong> All data
                  transmitted between your device and our servers is encrypted
                </li>
                <li>
                  <strong className="text-foreground">
                    Secure Authentication:
                  </strong>{" "}
                  Better-auth provides secure login with session management
                </li>
                <li>
                  <strong className="text-foreground">Access Controls:</strong>{" "}
                  Limited employee access to personal data
                </li>
                <li>
                  <strong className="text-foreground">Regular Updates:</strong>{" "}
                  We keep our systems and dependencies up to date
                </li>
                <li>
                  <strong className="text-foreground">Monitoring:</strong> We
                  monitor for suspicious activity and security threats
                </li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100%
                secure. While we strive to protect your data, we cannot
                guarantee absolute security.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              6. Cookies and Tracking
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                6.1 What Are Cookies?
              </h3>
              <p>
                Cookies are small text files stored on your device that help us
                provide and improve our service.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                6.2 Types of Cookies We Use
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Essential Cookies:
                  </strong>{" "}
                  Required for authentication and core functionality
                </li>
                <li>
                  <strong className="text-foreground">
                    Analytics Cookies:
                  </strong>{" "}
                  Help us understand how users interact with our platform
                </li>
                <li>
                  <strong className="text-foreground">
                    Preference Cookies:
                  </strong>{" "}
                  Remember your settings and preferences
                </li>
                <li>
                  <strong className="text-foreground">
                    Performance Cookies:
                  </strong>{" "}
                  Improve platform performance and load times
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                6.3 Managing Cookies
              </h3>
              <p>
                You can control cookies through your browser settings. However,
                disabling essential cookies may affect platform functionality.
                Note that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most browsers allow you to refuse or delete cookies</li>
                <li>
                  Disabling cookies may prevent you from using certain features
                </li>
                <li>Your preferences are stored in cookies</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                6.4 Third-Party Tracking
              </h3>
              <p>
                We use Google Analytics (or Umami) to understand user behavior.
                These services may use their own cookies. You can opt out of
                Google Analytics by installing the Google Analytics Opt-out
                Browser Add-on.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Your Rights and Choices
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You have the following rights regarding your personal
                information:
              </p>

              <h3 className="text-lg font-semibold text-foreground">
                7.1 Access and Portability
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request a copy of your personal data</li>
                <li>Export your content (recipes, posts, comments)</li>
                <li>View your account information in your profile settings</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                7.2 Correction and Update
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Update your profile information at any time</li>
                <li>Edit or delete your content (recipes, posts, comments)</li>
                <li>Correct inaccurate information in your account settings</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                7.3 Deletion and Account Closure
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delete your account and personal data at any time</li>
                <li>Request deletion of specific content</li>
                <li>
                  Some information may be retained for legal or security
                  purposes
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                7.4 Communication Preferences
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opt out of non-essential emails</li>
                <li>Control notification settings</li>
                <li>
                  You cannot opt out of essential service emails (verification,
                  security alerts)
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                7.5 Data Retention
              </h3>
              <p>
                We retain your data for as long as your account is active or as
                needed to provide services. After account deletion:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most personal data is deleted within 30 days</li>
                <li>Some data may be retained for legal compliance</li>
                <li>Anonymized data may be kept for analytics</li>
                <li>Backup systems may retain data for up to 90 days</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Children&apos;s Privacy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cakranesia is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>
              <p>
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us at
                id.cakranesia@gmail.com. We will delete such information from
                our systems.
              </p>
              <p>
                Users between 13 and 18 years old should have parental consent
                before using our service.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. International Data Transfers
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cakranesia is based in Indonesia. Your information may be
                transferred to and processed in Indonesia or other countries
                where our service providers operate.
              </p>
              <p>
                By using Cakranesia, you consent to the transfer of your
                information to countries that may have different data protection
                laws than your country of residence.
              </p>
              <p>
                We ensure that appropriate safeguards are in place to protect
                your data in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for legal, operational, or
                regulatory reasons.
              </p>
              <p>When we make significant changes, we will:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Update the &quot;Last updated&quot; date at the top of this
                  page
                </li>
                <li>
                  Notify you via email or through a prominent notice on our
                  platform
                </li>
                <li>
                  Give you time to review the changes before they take effect
                </li>
              </ul>
              <p>
                We encourage you to review this Privacy Policy periodically.
                Continued use of Cakranesia after changes constitutes acceptance
                of the updated policy.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              11. Contact Us
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or how we handle your personal information,
                please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg mt-4 space-y-2">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:id.cakranesia@gmail.com"
                    className="text-primary hover:underline"
                  >
                    id.cakranesia@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong>{" "}
                  cakranesia.com
                </p>
                <p className="text-sm mt-4">
                  We will respond to your inquiry within 7 business days.
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Acknowledgment */}
          <section className="mb-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  By using Cakranesia, you acknowledge that you have read and
                  understood this Privacy Policy and agree to the collection,
                  use, and disclosure of your information as described herein.
                  Thank you for trusting us with your personal information as we
                  work together to preserve Indonesian culinary heritage —{" "}
                  <strong className="text-foreground">
                    Melestarikan Cita Rasa Indonesia
                  </strong>
                  .
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12 flex-wrap">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
