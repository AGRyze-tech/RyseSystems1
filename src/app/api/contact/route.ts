import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, whatsapp, revenue, patientsPerMonth, hasSite } = body

    await resend.emails.send({
      from: 'RyzeSystems <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `🩺 Novo lead: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0A1A0F; color: #ffffff; border-radius: 12px;">
          <h1 style="color: #40916C; font-size: 24px; margin-bottom: 8px;">Novo lead recebido</h1>
          <p style="color: #ffffff99; margin-bottom: 32px; font-size: 14px;">Via formulário do site RyzeSystems</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Nome</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">WhatsApp</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #40916C; font-size: 15px; font-weight: 600;">${whatsapp}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Faturamento</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff; font-size: 15px;">${revenue}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Pacientes/mês</td>
              <td style="padding: 14px 0; border-bottom: 1px solid #ffffff15; color: #ffffff; font-size: 15px;">${patientsPerMonth}</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Tem site?</td>
              <td style="padding: 14px 0; color: #ffffff; font-size: 15px;">${hasSite}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #40916C20; border-radius: 8px; border: 1px solid #40916C40;">
            <p style="margin: 0; color: #40916C; font-size: 13px; font-weight: 600;">👉 Entre em contato via WhatsApp o quanto antes!</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json({ error: 'Erro ao enviar' }, { status: 500 })
  }
}
