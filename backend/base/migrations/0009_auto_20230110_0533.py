# Generated by Django 3.2.5 on 2023-01-10 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_auto_20230106_1844'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('product', models.CharField(blank=True, max_length=200, null=True)),
                ('text', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='visible',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
